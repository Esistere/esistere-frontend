import React, { ComponentType, ReactElement } from 'react';
import { useUser, UserType } from '../UserProvider';
import AccessoNegato from '../AccessoNegato';
import Caricamento from '../../gestione_app/Caricamento';

const withMedico = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const WithMedico: React.FC<P> = (props: P): ReactElement | null => {
    const { userType, loading } = useUser();

    if (loading || userType === null) {
      return <Caricamento/>;
    }

    if (userType !== UserType.medico) {
      return <AccessoNegato />;
    }

    return <Component {...props} />;
  };

  const componentName = Component.displayName || Component.name || 'Component';
  WithMedico.displayName = `WithCaregiver(${componentName})`;

  return WithMedico;
};

export default withMedico;
