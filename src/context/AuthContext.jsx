import { createContext, useContext, useMemo, useState } from 'react';
import {
  clearSession,
  getCurrentUser,
  loginUser,
  registerUser
} from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const value = useMemo(
    () => ({
      user,
      login(email, password) {
        const result = loginUser(email, password);
        if (result.ok) setUser(result.user);
        return result;
      },
      register(name, email, password) {
        const result = registerUser(name, email, password);
        if (result.ok) {
          const loginResult = loginUser(email, password);
          if (loginResult.ok) setUser(loginResult.user);
        }
        return result;
      },
      logout() {
        clearSession();
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
