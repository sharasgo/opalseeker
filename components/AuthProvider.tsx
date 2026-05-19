'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'customer' | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: async () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'customer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // check or create user profile
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          let currentRole = userData.role;
          
          if (currentRole !== 'admin' && (currentUser.email === 'ayhkuc1@gmail.com' || currentUser.email?.startsWith('admin'))) {
            const { updateDoc } = await import('firebase/firestore');
            await updateDoc(userRef, { role: 'admin', updatedAt: Date.now() });
            currentRole = 'admin';
          }
          
          setRole(currentRole);
        } else {
          // create new customer or admin
          const newRole = (currentUser.email === 'ayhkuc1@gmail.com' || currentUser.email?.startsWith('admin')) ? 'admin' : 'customer';
          await setDoc(userRef, {
            email: currentUser.email,
            role: newRole,
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
          setRole(newRole);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        // Ignored, user closed it
      } else {
        alert("Sign in failed. Note: If you are viewing this within the AI Studio embedded preview, Google Sign-In popups might be blocked by your browser's third-party cookie settings. Please use the 'Open in new tab' button at the top right to open the app in a new tab and try again.\n\nError details: " + error.message);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
