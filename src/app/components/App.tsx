import React from 'react';
import Navbar from './Navbar';
import { useUser, UserType } from './gestione_app/UserProvider';
import HomeMedico from './gestione_app/HomeMedico';
import HomeCaregiver from './gestione_app/HomeCaregiver';

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
