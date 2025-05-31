import React, { useContext } from 'react';
import Alert from './alert.component';
import { StyledListContainer } from './alerts-list.styles';
import { AlertsContext } from '../../../../contexts/signed-in/alerts/alerts.context';
import { Alert as AlertType } from '../../../../contexts/signed-out/alerts/alerts.types';

const items = [
  'Intro',
  'Load Balancing',
  'Api Gateway',
];

const AlertsList: React.FC = () => {
  const { alerts, deleteAlert } = useContext(AlertsContext)

  const handleDelete = (item: AlertType) => {

  }

  return (
    <StyledListContainer>
      {alerts?.map((item, index) => (
        <Alert key={index} ticker={`${item}`} direction={`${item}`}
          threshold={`${item}`} onDelete={() => handleDelete(item)} />
      ))}
    </StyledListContainer>
  );
};

export default AlertsList;