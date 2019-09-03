import React from 'react';
import useInputHandler from './useInputHandler';
import { ChipsContext } from '../contexts/ChipsContext';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;;
  height: 30px;
  box-sizing: border-box;
  border-radius: 0.2rem;
  color: #565656;
  font: inherit;
  resize: none;
  overflow: hidden;
  outline: none;
  border: none;
  background-color: transparent;
`
const StyledMenu = styled.ul`
  list-style-type: none;
  position: absolute;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding-left: 0px;
`
const StyledMenuLi = styled.li`
  list-style-type: none;
  padding: 15px;
  color: #515151;
  background-color: white;
  width: 250px;

  &:hover {
    background-color: #F8F8F8;
    color: #515151;
  }
`
const optionsSet = [
  "dor@gmail.com",
  "nokky@gmail.com",
  "guy@yahoo.com",
  "shuki@stormblack.com",
  "or@stormblack.com"
]

const To = React.forwardRef((_props, ref) => {
  const { addChip } = React.useContext(ChipsContext);
  const { values, resetValues, handleChange, handleKeyDown, handleSubmit } = useInputHandler(addChip);
  const [showOptions, setShowOptions] = React.useState(false);
  const [options, setOptions] = React.useState(optionsSet);

  const handleOnChange = React.useCallback(e => {
    handleChange(e);
    const newOptions = options.filter(item => {
      if (item.includes(e.target.value) && e.target.value.length > 0) {
        return item;
      }
    })
    setOptions(newOptions);
    if (options.length > 0) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
    ref.current.focus();
  }, [])

  const handleOnMouseDown = (e, item) => {
    e.preventDefault()
    addChip(item)
    resetValues();
    setShowOptions(false)
    ref.current.focus();
  }

  const handleBlur = () => {
    setShowOptions(false);
    handleSubmit();
  }

  const handleOnKeyDown = e => {
    handleKeyDown(e);
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      setShowOptions(false)
    }
  }

  return (
    <>
      <StyledTextArea type='text'
        name='email'
        value={values.email}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onBlur={handleBlur}
        autoFocus
        ref={ref}
      >
      </StyledTextArea>
      {showOptions && (
        <StyledMenu>
          {options.map((item, id) => (
            <StyledMenuLi key={id}
              onMouseDown={e => handleOnMouseDown(e, item)}
              onClick={e => e.preventDefault()}>
              {item}
            </StyledMenuLi>
          ))}
        </StyledMenu>
      )
      }
    </>
  );
})

export default To;