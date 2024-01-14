import React, { ComponentType, ReactElement } from 'react';
import { useUser, UserType } from '../UserProvider';
import AccessoNegato from '../AccessoNegato';
import Caricamento from '../../gestione_app/Caricamento';

const withCaregiver = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const WithCaregiver: React.FC<P> = (props: P): ReactElement | null => {
    const { userType, loading } = useUser();

    if (loading || userType === null) {
      return <Caricamento/>;
    }

    if (userType !== UserType.caregiver) {
      return <AccessoNegato />;
    }

    return <Component {...props} />;
  };

  const componentName = Component.displayName || Component.name || 'Component';
  WithCaregiver.displayName = `WithCaregiver(${componentName})`;

  return WithCaregiver;
};

export default withCaregiver;
