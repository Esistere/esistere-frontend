import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { UserType } from './gestione_app/UserProvider';

function App(): JSX.Element {
  const navigate = useNavigate();
  const userType: string | null = localStorage.getItem('id');

  useEffect(() => {
    if (userType !== null) {
      const userTypeNumber = Number(userType);
      if (userTypeNumber === UserType.caregiver) {
        navigate('/caregiver');
        window.location.reload();
      } else if (userTypeNumber === UserType.medico) {
        navigate('/medico');
        window.location.reload();
      }
    }
  }, [navigate, userType]);

  return (
    <>
      <Navbar />
      <h2>Home</h2>
    </>
  );
}

export default App;
