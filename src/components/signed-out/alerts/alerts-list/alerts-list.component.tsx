import React, { useContext } from 'react';
import AlertItem from './alert.component';
import { StyledListContainer } from './alerts-list.styles';
import { AlertsContext } from '../../../../contexts/signed-out/alerts/alerts.context';
import { Alert as AlertType } from '../../../../contexts/signed-out/alerts/alerts.types';

const AlertsList: React.FC = () => {
  const { alerts, deleteAlert } = useContext(AlertsContext)

  const handleDelete = (alert: AlertType) => {
    deleteAlert(alert)
  }

  return (
    <StyledListContainer>
      {alerts?.map((alert, index) => (
        <AlertItem key={index} alert={ alert } onDelete={() => handleDelete(alert)} />
      ))}
    </StyledListContainer>
  );
};

export default AlertsList;