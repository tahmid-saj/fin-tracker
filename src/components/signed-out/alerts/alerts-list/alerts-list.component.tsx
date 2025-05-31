import React from 'react';
import Alert from './alert.component';
import { StyledListContainer } from './alerts-list.styles';

const items = [
  'Intro',
  'Load Balancing',
  'Api Gateway',
];

const AlertsList: React.FC = () => {
  const handleDelete = (ticker: string) => {
    console.log(`Delete ${ticker}`);
  };

  return (
    <StyledListContainer>
      {items.map((item, index) => (
        <Alert key={index} ticker={`${item}`} direction={`${item}`}
          threshold={`${item}`} onDelete={() => handleDelete(item)} />
      ))}
    </StyledListContainer>
  );
};

export default AlertsList;