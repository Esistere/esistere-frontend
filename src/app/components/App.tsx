import React, { useEffect } from 'react';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import { useNavigate } from 'react-router-dom';
import Caricamento from './gestione_app/Caricamento';
import Navbar from './Navbar';
import Footer from './Footer';

function App(): JSX.Element {
  const { userType, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (userType === UserType.medico) {
        navigate('/medico');
      } else if (userType === UserType.caregiver) {
        navigate('/caregiver');
      }
    }
  }, [userType, loading, navigate]);

  if (loading) {
    return <Caricamento />;
  }

  return (
    <>
      <Navbar />
      <h2>Home</h2>
      <Footer />
    </>
  );
}

export default App;
