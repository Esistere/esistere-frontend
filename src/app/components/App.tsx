import React, { useEffect } from 'react';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import { useNavigate } from 'react-router-dom';
import Caricamento from './gestione_app/Caricamento';
import HomeMedico from './gestione_autenticazione/medico/HomeMedico';
import HomeCaregiver from './gestione_autenticazione/caregiver/HomeCaregiver';

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
    return <Caricamento/>;
  }

  if (userType === UserType.medico) {
    return <HomeMedico />;
  } else if (userType === UserType.caregiver) {
    return <HomeCaregiver />;
  } else {
    return (
      <>
        <h2>Home</h2>
        <h1>Kitemuort</h1>
      </>
    );
  }
}

export default App;
