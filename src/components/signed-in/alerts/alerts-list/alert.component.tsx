import React, { useContext } from 'react';
import { StyledItemContainer, StyledItemTitle, StyledDeleteIcon } from './alerts-list.styles';
import { Alert } from '../../../../contexts/signed-in/alerts/alerts.types';
import { AlertsContext } from '../../../../contexts/signed-in/alerts/alerts.context';

export interface AlertProps {
  alert: Alert
}

const AlertItem: React.FC<AlertProps> = ({ alert }) => {
  const { deleteAlert } = useContext(AlertsContext)

  const onDelete = () => {
    deleteAlert(alert)
  }

  return (
    <StyledItemContainer>
      <StyledItemTitle>{alert.ticker} | {alert.direction} | ${alert.threshold}</StyledItemTitle>
      <StyledDeleteIcon onClick={onDelete} />
    </StyledItemContainer>
  );
};

export default AlertItem;