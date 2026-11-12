package com.trichyflow.controller;

import com.trichyflow.model.User;
import com.trichyflow.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
public class WebAuthController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/login")
    public String showLoginPage(@RequestParam(value = "error", required = false) String error,
                                @RequestParam(value = "msg", required = false) String msg,
                                @RequestParam(value = "registered", required = false) String registered,
                                @RequestParam(value = "logout", required = false) String logout,
                                Model model,
                                HttpSession session) {

        if (session.getAttribute("user") != null) {
            String role = (String) session.getAttribute("role");
            if ("TRAFFIC_POLICE".equalsIgnoreCase(role)) {
                return "redirect:/police-dashboard.html";
            } else if ("PUBLIC".equalsIgnoreCase(role) || "CITIZEN".equalsIgnoreCase(role)) {
                return "redirect:/public-portal.html";
            }
            return "redirect:/dashboard.html";
        }

        if (error != null) {
            model.addAttribute("error", error);
        }
        if (msg != null) {
            model.addAttribute("msg", msg);
        }
        if (registered != null) {
            model.addAttribute("msg", "Officer account successfully registered in the TrichyFlow database! Please log in.");
        }
        if (logout != null) {
            model.addAttribute("msg", "Session closed successfully. Log in to continue.");
        }

        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam("username") String username,
                               @RequestParam("password") String password,
                               @RequestParam(value = "role", required = false, defaultValue = "CONTROL_ROOM") String role,
                               HttpSession session,
                               Model model) {

        Optional<User> userOpt = userRepository.findByUsername(username.trim());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (role != null && !role.equalsIgnoreCase(user.getRole())) {
                model.addAttribute("error", "Role mismatch: User '" + username + "' is registered as " + user.getRole() + ".");
                return "login";
            }

            boolean matches = passwordEncoder.matches(password, user.getPasswordHash()) ||
                              password.equals(user.getPasswordHash());
            if (!matches) {
                model.addAttribute("error", "Invalid username or password for " + username + ".");
                return "login";
            }

            // Set Java HTTP Session
            session.setAttribute("user", user.getUsername());
            session.setAttribute("fullName", user.getFullName());
            session.setAttribute("role", user.getRole());
            session.setAttribute("badgeNumber", user.getBadgeNumber());

            if ("TRAFFIC_POLICE".equalsIgnoreCase(user.getRole())) {
                return "redirect:/police-dashboard.html";
            } else if ("PUBLIC".equalsIgnoreCase(user.getRole()) || "CITIZEN".equalsIgnoreCase(user.getRole())) {
                return "redirect:/public-portal.html";
            }
            return "redirect:/dashboard.html";
        }

        // Demo user fallback verification
        if (("admin".equals(username) && "admin123".equals(password)) ||
            ("police".equals(username) && "police123".equals(password)) ||
            ("control".equals(username) && "control123".equals(password)) ||
            ("citizen".equals(username) && "citizen123".equals(password))) {

            session.setAttribute("user", username);
            session.setAttribute("fullName", "admin".equals(username) ? "Commissioner S. Ramanathan" : ("police".equals(username) ? "Inspector M. Anbarasan" : ("citizen".equals(username) ? "Trichy Resident (Public User)" : "Operator K. Selvam")));
            session.setAttribute("role", "citizen".equals(username) ? "PUBLIC" : role);
            session.setAttribute("badgeNumber", "admin".equals(username) ? "IPS-TR-01" : ("police".equals(username) ? "TP-CHATH-42" : ("citizen".equals(username) ? "CITIZEN-TN45" : "CR-SYS-108")));

            if ("TRAFFIC_POLICE".equalsIgnoreCase(role)) {
                return "redirect:/police-dashboard.html";
            } else if ("PUBLIC".equalsIgnoreCase(role) || "citizen".equals(username)) {
                return "redirect:/public-portal.html";
            }
            return "redirect:/dashboard.html";
        }

        model.addAttribute("error", "Invalid username or password. Please verify credentials.");
        return "login";
    }

    @GetMapping("/register")
    public String showRegisterPage(Model model) {
        return "register";
    }

    @PostMapping("/register")
    public String processRegister(@RequestParam("fullName") String fullName,
                                  @RequestParam("username") String username,
                                  @RequestParam("role") String role,
                                  @RequestParam("badgeNumber") String badgeNumber,
                                  @RequestParam("email") String email,
                                  @RequestParam("phone") String phone,
                                  @RequestParam("password") String password,
                                  @RequestParam("confirmPassword") String confirmPassword,
                                  Model model) {

        if (!password.equals(confirmPassword)) {
            model.addAttribute("error", "Passwords do not match. Please re-enter.");
            return "register";
        }

        if (password.length() < 5) {
            model.addAttribute("error", "Password must be at least 5 characters long.");
            return "register";
        }

        if (userRepository.findByUsername(username.trim()).isPresent()) {
            model.addAttribute("error", "Username '" + username + "' is already registered. Choose another.");
            return "register";
        }

        String encodedPassword = passwordEncoder.encode(password);
        User newUser = new User(username.trim(), encodedPassword, fullName.trim(), role.toUpperCase(), badgeNumber.trim(), email.trim(), phone.trim());
        userRepository.save(newUser);

        return "redirect:/login?registered=true";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login?logout=true";
    }

    @GetMapping("/api/auth/session")
    @ResponseBody
    public Map<String, Object> getCurrentSession(HttpSession session) {
        Map<String, Object> data = new HashMap<>();
        if (session.getAttribute("user") != null) {
            data.put("authenticated", true);
            data.put("username", session.getAttribute("user"));
            data.put("fullName", session.getAttribute("fullName"));
            data.put("role", session.getAttribute("role"));
            data.put("badgeNumber", session.getAttribute("badgeNumber"));
        } else {
            data.put("authenticated", false);
        }
        return data;
    }
}
