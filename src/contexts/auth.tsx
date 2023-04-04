import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { app } from '@services/firebase';
import { User } from 'types/index';

const provider = new GoogleAuthProvider();

type UserContextData = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext({} as UserContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const { uid, displayName, email } = result.user;

      if (!displayName || !email) {
        throw new Error('Missing information from google account');
      }

      const userData = {
        id: uid,
        name: displayName,
        email,
      };

      sessionStorage.setItem(
        '@user-collaborative-todo-list',
        JSON.stringify(userData)
      );

      setUser(userData);
    } catch (error) {
      alert('Houve um erro durante o login');
    }
  };

  const logout = () => setUser(null);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(
      '@user-collaborative-todo-list'
    );

    if (sessionStorageData) {
      setUser(JSON.parse(sessionStorageData));
      return;
    }

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email } = user;

        if (!displayName || !email) {
          throw new Error('Missing information from google account');
        }

        const userData = {
          id: uid,
          name: displayName,
          email: email,
        };

        sessionStorage.setItem(
          '@user-collaborative-todo-list',
          JSON.stringify(userData)
        );

        setUser(userData);
      }
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
