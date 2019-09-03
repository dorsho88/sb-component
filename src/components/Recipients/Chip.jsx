import React from 'react';
import styled from 'styled-components';

const StyledChipEl = styled.span`
  display: inline-block;
  border: ${(props) => props.isChip ? '1px solid black' : 'none'};
  ${(props) => props.isValid ? 'background-color: white; border: 1px solid black;' : 'background-color: #a50000; color: white'}
  border-radius: 25px;
  margin: 2px;
  padding: 5px 10px;
`
const StyledAggChipEl = styled.span`
  display: inline-block;
  margin-left: 5px;
  padding: 1px 10px;
  border-radius: 5px;
  background-color: white;
  color: black;
  border: 1px solid #a50000;
`
const StyledAdress = styled.span`
  display: inline-block;
  padding: 6px 0px;;
  margin: 2px 0px;
`
const StyledIcon = styled.span`
  &::before {
    content: 'X';
    margin: 0 5px;
    cursor:pointer;
  }
`
const Chip = (props) => {
  const { isCollapsed, chip, onDelete, isNotFirst } = props;
  const [value, setValue] = React.useState(chip);

  const isValidAdress = () => {
    // this is a very long validator. maybe find elegant one?
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(chip).toLowerCase());
  }

  // use onmousedown event because it happens before blur (on parent)
  const handleOnMouseDown = (e, index) => {
    e.preventDefault();
    onDelete(e, index);
  }

  return isCollapsed ?
    (
      <StyledAdress>{(isNotFirst ? ', ' : '') + value}</StyledAdress>
    )
    : (
      <StyledChipEl
        isValid={isValidAdress()}>
        {value}
        <StyledIcon onMouseDown={e => handleOnMouseDown(e)} />
      </StyledChipEl>
    );
}

export const AggChip = (props) => {
  return (
    <StyledAggChipEl>
      {props.text} more
    </StyledAggChipEl>
  )
}

export default Chip;
