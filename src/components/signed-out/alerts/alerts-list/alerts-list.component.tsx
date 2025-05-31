import React, { useContext } from 'react';
import AlertItem from './alert.component';
import { StyledListContainer } from './alerts-list.styles';
import { AlertsContext } from '../../../../contexts/signed-out/alerts/alerts.context';
import { Alert as AlertType } from '../../../../contexts/signed-out/alerts/alerts.types';

const AlertsList: React.FC = () => {
  const { alerts } = useContext(AlertsContext)

  return (
    <StyledListContainer>
      {alerts?.map((alert, index) => (
        <AlertItem key={index} alert={ alert } />
      ))}
    </StyledListContainer>
  );
};

export default AlertsList;