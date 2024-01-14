import React, { useEffect } from 'react';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import { useNavigate } from 'react-router-dom';

function App(): JSX.Element {
  const { userType } = useUser();
  const navigate = useNavigate();

  useEffect((): void => {
    if (userType === UserType.medico) {
      navigate('/medico');
    } else if (userType === UserType.caregiver) {
      navigate('/caregiver');
    }
  }, [userType, navigate]);

  return (
    <>
      <h2>Home</h2>
    </>
  );
}

export default App;
