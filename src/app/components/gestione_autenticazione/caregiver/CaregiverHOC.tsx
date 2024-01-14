import React, { ComponentType, ReactElement } from 'react';
import { useUser, UserType } from '../UserProvider';
import AccessoNegato from '../AccessoNegato';

const withCaregiver = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const WithCaregiver: React.FC<P> = (props: P): ReactElement | null => {
    const { userType } = useUser();
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
