const USERS_KEY = 'taskflow_users';
const SESSION_KEY = 'taskflow_session';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
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

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function registerUser(name, email, password) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    return { ok: false, message: 'An account with this email already exists.' };
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' };
  }

  users.push({
    name: name.trim(),
    email: normalizedEmail,
    password
  });
  saveUsers(users);
  return { ok: true };
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(
    (u) => u.email === normalizedEmail && u.password === password
  );

  if (!user) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  setSession(user);
  return { ok: true, user };
}
