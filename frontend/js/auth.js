/**
 * TRICHYFLOW Authentication & Session Management
 */

const AuthManager = {
  initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    // Quick demo autofill buttons
    document.querySelectorAll('.demo-credential-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const u = e.currentTarget.getAttribute('data-user');
        const p = e.currentTarget.getAttribute('data-pass');
        const r = e.currentTarget.getAttribute('data-role');
        
        document.getElementById('username').value = u;
        document.getElementById('password').value = p;
        document.getElementById('roleSelect').value = r;
      });
    });

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const role = document.getElementById('roleSelect').value;
      const errorMsg = document.getElementById('loginError');

      if (!username || !password || !role) {
        if (errorMsg) {
          errorMsg.textContent = "Please enter username, password and select a role.";
          errorMsg.style.display = "block";
        }
        return;
      }

      const btn = loginForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Authenticating...`;
      btn.disabled = true;

      try {
        const result = await TrichyAPI.login(username, password, role);
        if (result.success) {
          const userRole = (result.user && result.user.role ? result.user.role : role).toUpperCase();
          if (userRole === 'PUBLIC' || userRole === 'CITIZEN') {
            window.location.href = 'public-portal.html';
          } else if (userRole === 'TRAFFIC_POLICE') {
            window.location.href = 'police-dashboard.html';
          } else {
            window.location.href = 'dashboard.html';
          }
        } else {
          if (errorMsg) {
            errorMsg.textContent = result.message || "Invalid credentials.";
            errorMsg.style.display = "block";
          }
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = "Authentication server error. Try again.";
          errorMsg.style.display = "block";
        }
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  },

  initRegister() {
    const regForm = document.getElementById('registerForm');
    if (!regForm) return;

    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value.trim();
      const username = document.getElementById('regUsername').value.trim();
      const role = document.getElementById('regRole') ? document.getElementById('regRole').value : 'PUBLIC';
      const vehicleNo = document.getElementById('regVehicleNo') ? document.getElementById('regVehicleNo').value.trim() : '';
      const email = document.getElementById('regEmail') ? document.getElementById('regEmail').value.trim() : '';
      const phone = document.getElementById('regPhone') ? document.getElementById('regPhone').value.trim() : '';
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      const regMsg = document.getElementById('regFeedbackMsg');

      if (password !== confirmPassword) {
        if (regMsg) {
          regMsg.className = "alert alert-danger py-2 px-3 mb-3 text-center";
          regMsg.textContent = "Passwords do not match. Please re-enter.";
          regMsg.style.display = "block";
        }
        return;
      }

      if (password.length < 4) {
        if (regMsg) {
          regMsg.className = "alert alert-danger py-2 px-3 mb-3 text-center";
          regMsg.textContent = "Password must be at least 4 characters long.";
          regMsg.style.display = "block";
        }
        return;
      }

      const submitBtn = regForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin me-1"></i> Registering Account...`;
      submitBtn.disabled = true;

      try {
        const res = await TrichyAPI.register({
          fullName, username, role, vehicleNo, email, phone, password
        });

        if (res.success) {
          if (regMsg) {
            regMsg.className = "alert alert-success py-2 px-3 mb-3 text-center";
            regMsg.innerHTML = `<i class="fa fa-check-circle me-1"></i> ${res.message}`;
            regMsg.style.display = "block";
          }
          regForm.reset();

          // Auto-fill login tab if on same page
          if (document.getElementById('username')) {
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            if (document.getElementById('roleSelect')) {
              document.getElementById('roleSelect').value = role;
            }
          }

          // Switch back to login view after short delay if tab exists
          setTimeout(() => {
            const loginTabBtn = document.getElementById('tabLoginBtn');
            if (loginTabBtn) loginTabBtn.click();
          }, 1500);
        } else {
          if (regMsg) {
            regMsg.className = "alert alert-danger py-2 px-3 mb-3 text-center";
            regMsg.textContent = res.message || "Registration failed.";
            regMsg.style.display = "block";
          }
        }
      } catch (err) {
        if (regMsg) {
          regMsg.className = "alert alert-danger py-2 px-3 mb-3 text-center";
          regMsg.textContent = "Error saving registration. Please try again.";
          regMsg.style.display = "block";
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  },

  checkSession(requiredRole = null) {
    const user = TrichyAPI.getCurrentUser();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }

    // Role check if needed
    if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
      alert("Unauthorized: Your role does not have permission to view this view.");
      window.location.href = user.role === 'TRAFFIC_POLICE' ? 'police-dashboard.html' : 'dashboard.html';
      return null;
    }

    // Populate user profile info in navigation
    const nameEl = document.getElementById('navUserName');
    const roleEl = document.getElementById('navUserRole');
    const badgeEl = document.getElementById('navUserBadge');

    if (nameEl) nameEl.textContent = user.fullName;
    if (roleEl) {
      roleEl.textContent = user.role.replace('_', ' ');
      roleEl.className = `role-pill role-${user.role.toLowerCase().replace('_', '-')}`;
    }
    if (badgeEl) badgeEl.textContent = user.badgeNumber || '';

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        TrichyAPI.logout();
      });
    }

    return user;
  }
};

window.AuthManager = AuthManager;
