import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';

export enum UserType {
  medico,
  caregiver,
}

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userType: UserType | null;
  setUserType: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const loginControl = new LoginControl();

      try {
        const data = await loginControl.userType();
        const userType =
          data == 'medico' ? UserType.medico : UserType.caregiver;
        setUserType(userType);
      } catch (error) {
        console.error('Error fetching user type:', error);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('jwt')) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType, loading }}>
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
