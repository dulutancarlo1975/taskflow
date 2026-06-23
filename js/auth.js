/**
 * TaskFlow — Client-side authentication (localStorage)
 * Supports registration, login, session, and protected routes.
 */

const USERS_KEY = 'taskflow_users';
const SESSION_KEY = 'taskflow_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function setSession(user) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, name: user.name })
  );
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function registerUser(name, email, password) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(function exists(u) { return u.email === normalizedEmail; })) {
    return { ok: false, message: 'An account with this email already exists.' };
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' };
  }

  users.push({
    name: name.trim(),
    email: normalizedEmail,
    password: password
  });
  saveUsers(users);
  return { ok: true };
}

function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(function match(u) {
    return u.email === normalizedEmail && u.password === password;
  });

  if (!user) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  setSession(user);
  return { ok: true, user: user };
}

function logoutUser() {
  clearSession();
  window.location.href = 'login.html';
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function initAuthPage(options) {
  const form = document.getElementById(options.formId);
  const errorEl = document.getElementById('auth-error');
  if (!form) return;

  form.addEventListener('submit', function onSubmit(e) {
    e.preventDefault();
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    let result;

    if (options.mode === 'register') {
      result = registerUser(name, email, password);
      if (result.ok) {
        loginUser(email, password);
        window.location.href = 'dashboard.html';
        return;
      }
    } else {
      result = loginUser(email, password);
      if (result.ok) {
        window.location.href = 'dashboard.html';
        return;
      }
    }

    if (errorEl && result) {
      errorEl.textContent = result.message;
      errorEl.hidden = false;
    }
  });
}

function initDashboardAuth() {
  if (!requireAuth()) return;

  const user = getCurrentUser();
  const greeting = document.getElementById('user-greeting');
  const logoutBtn = document.getElementById('logout-btn');

  if (greeting && user) {
    greeting.textContent = 'Hello, ' + user.name;
    greeting.hidden = false;
  }

  if (logoutBtn) {
    logoutBtn.hidden = false;
    logoutBtn.addEventListener('click', logoutUser);
  }
}

document.addEventListener('DOMContentLoaded', function onReady() {
  const page = document.body.dataset.page;

  if (page === 'login') {
    initAuthPage({ formId: 'login-form', mode: 'login' });
  } else if (page === 'register') {
    initAuthPage({ formId: 'register-form', mode: 'register' });
  } else if (page === 'dashboard') {
    initDashboardAuth();
  } else if (page === 'contact') {
    initContactForm();
  }
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', function onSubmit(e) {
    e.preventDefault();
    form.reset();
    if (successEl) {
      successEl.hidden = false;
      setTimeout(function hide() {
        successEl.hidden = true;
      }, 5000);
    }
  });
}
