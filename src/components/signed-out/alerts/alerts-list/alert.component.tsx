import React from 'react';
import { StyledItemContainer, StyledItemTitle, StyledDeleteIcon } from './alerts-list.styles';
import { Alert } from '../../../../contexts/signed-out/alerts/alerts.types';

export interface AlertProps {
  alert: Alert
  onDelete: () => void
}

const AlertItem: React.FC<AlertProps> = ({ alert, onDelete }) => {
  return (
    <StyledItemContainer>
      <StyledItemTitle>{alert.ticker} | {alert.direction} | {alert.threshold} | {alert.email}</StyledItemTitle>
      <StyledDeleteIcon onClick={onDelete} />
    </StyledItemContainer>
  );
};

export default AlertItem;