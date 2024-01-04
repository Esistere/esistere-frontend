import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userType: string | null;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const loginControl = new LoginControl();

      try {
        const data = await loginControl.userType();
        setUserType(data);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    if (localStorage.getItem('jwt')) {
      fetchData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
