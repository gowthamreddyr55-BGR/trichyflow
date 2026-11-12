package com.trichyflow.controller;

import com.trichyflow.model.User;
import com.trichyflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private final org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder passwordEncoder = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String role = credentials.get("role");

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (role != null && !role.equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(401).body(Map.of("message", "Role mismatch for user."));
            }

            boolean matches = passwordEncoder.matches(password, user.getPasswordHash()) ||
                              password.equals(user.getPasswordHash());
            if (!matches) {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
            }

            Map<String, Object> resp = new HashMap<>();
            resp.put("id", user.getId());
            resp.put("username", user.getUsername());
            resp.put("fullName", user.getFullName());
            resp.put("role", user.getRole());
            resp.put("badgeNumber", user.getBadgeNumber());
            resp.put("token", "jwt-trichyflow-" + System.currentTimeMillis());
            return ResponseEntity.ok(resp);
        }

        // Default demo fallback verification
        if (("admin".equals(username) && "admin123".equals(password)) ||
            ("police".equals(username) && "police123".equals(password)) ||
            ("control".equals(username) && "control123".equals(password)) ||
            ("citizen".equals(username) && "citizen123".equals(password))) {
            
            Map<String, Object> resp = new HashMap<>();
            resp.put("username", username);
            resp.put("fullName", "admin".equals(username) ? "Commissioner S. Ramanathan" : ("police".equals(username) ? "Inspector M. Anbarasan" : ("citizen".equals(username) ? "Trichy Resident (Public User)" : "Operator K. Selvam")));
            resp.put("role", "citizen".equals(username) ? "PUBLIC" : (role != null ? role : "CONTROL_ROOM"));
            resp.put("badgeNumber", "admin".equals(username) ? "IPS-TR-01" : ("police".equals(username) ? "TP-CHATH-42" : ("citizen".equals(username) ? "CITIZEN-TN45" : "CR-SYS-108")));
            resp.put("token", "jwt-trichyflow-demo-" + System.currentTimeMillis());
            return ResponseEntity.ok(resp);
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        String fullName = payload.get("fullName");
        String role = payload.get("role");
        String badgeNumber = payload.get("badgeNumber");
        String email = payload.get("email");
        String phone = payload.get("phone");

        if (username == null || password == null || role == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username, password and role are required."));
        }

        if (userRepository.findByUsername(username.trim()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already registered."));
        }

        String encoded = passwordEncoder.encode(password);
        User user = new User(username.trim(), encoded, fullName, role.toUpperCase(), badgeNumber, email, phone);
        User saved = userRepository.save(user);

        Map<String, Object> resp = new HashMap<>();
        resp.put("id", saved.getId());
        resp.put("username", saved.getUsername());
        resp.put("fullName", saved.getFullName());
        resp.put("role", saved.getRole());
        resp.put("message", "User registered successfully in TrichyFlow database.");
        return ResponseEntity.ok(resp);
    }
}

