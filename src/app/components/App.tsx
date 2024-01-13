import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import { useNavigate } from 'react-router-dom';

function App(): JSX.Element {
  const { userType } = useUser();
  const navigate = useNavigate();

  useEffect((): void => {
    if (userType === UserType.medico) {
      navigate('/medico');
      window.location.reload();
    } else if (userType === UserType.caregiver) {
      navigate('/caregiver');
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <h2>Home</h2>
    </>
  );
}

export default App;
