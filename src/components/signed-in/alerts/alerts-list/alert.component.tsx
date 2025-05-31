import React from 'react';
import { StyledItemContainer, StyledItemTitle, StyledDeleteIcon } from './alerts-list.styles';

export interface AlertProps {
  ticker: string,
  direction: string,
  threshold: string,
  onDelete: () => void
}

const Alert: React.FC<AlertProps> = ({ ticker, direction, threshold, onDelete }) => {
  return (
    <StyledItemContainer>
      <StyledItemTitle>{ticker} | {direction} | ${threshold}</StyledItemTitle>
      <StyledDeleteIcon onClick={onDelete} />
    </StyledItemContainer>
  );
};

export default Alert;