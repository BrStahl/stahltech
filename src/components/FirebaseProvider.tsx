import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  connectionError: string | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  connectionError: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const isAdmin = user?.email?.toLowerCase() === 'stahltechweb@gmail.com' || user?.email?.toLowerCase() === 'jastahl56@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error: any) {
        console.error("Firestore connection test failed:", error);
        
        let msg = "Não foi possível alcançar o servidor do Firestore.";
        if (error instanceof Error && error.message.includes('the client is offline')) {
          msg = "Erro de rede / Offline. Verifique sua conexão ou se seu navegador/extensão (AdBlock, Brave Tracker Shields) está bloqueando as conexões do Firebase.";
        } else if (error?.code === 'failed-precondition' || error?.message?.includes('permissions')) {
          msg = "Sem permissão na regra ou inicialização pendente no Console do Firebase.";
        }
        
        setConnectionError(msg);
        console.error("Please check your Firebase configuration.");
      }
    };
    testConnection();

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading, isAdmin, connectionError }}>
      {children}
    </FirebaseContext.Provider>
  );
};
