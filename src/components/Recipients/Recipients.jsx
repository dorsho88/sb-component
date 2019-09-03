import React from 'react';
import Chips from './Chips';
import styled from 'styled-components';

const StyledRecipients = styled.div`
  width: 800px;
  height: 44px;
  height: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`

const Recipients = () => {
  return (
    <StyledRecipients>
      <Chips />
    </StyledRecipients>
  );
}

export default Recipients;
