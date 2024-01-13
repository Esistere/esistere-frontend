import React from 'react';
import Navbar from './Navbar';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import HomeMedico from './gestione_autenticazione/medico/HomeMedico';
import HomeCaregiver from './gestione_autenticazione/caregiver/HomeCaregiver';

function App(): JSX.Element {
  const { userType } = useUser();

  if (userType === UserType.medico) {
    return <HomeMedico />;
  } else if (userType === UserType.caregiver) {
    return <HomeCaregiver />;
  } else {
    return (
      <>
        <Navbar />
        <h2>Home</h2>
      </>
    );
  }
}

export default App;
