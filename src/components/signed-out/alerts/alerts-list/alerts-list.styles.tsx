import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const StyledItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  margin: 6px 0;
  border-radius: 6px;
  background-color: #1e293b;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f172a;
  }
`;

export const StyledItemTitle = styled.span`
  flex: 1;
`;

export const StyledDeleteIcon = styled(DeleteForeverIcon)`
  cursor: pointer;
  color: #94a3b8;
  &:hover {
    color: #f87171;
  }
`;

export const StyledListContainer = styled.div`
  background-color: #0f172a;
  padding: 24px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;