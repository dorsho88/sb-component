import React from 'react';
import To from './To'
import Chip, { AggChip } from './Chip'
import { ChipsContext } from '../contexts/ChipsContext';
import useInputHandler from './useInputHandler';
import styled from 'styled-components';
import uuid from 'react-uuid'

const StyledLi = styled.li`
  display: inline-flex;
  list-style: none; 
`
const StyledInputLi = styled.li`
  list-style: none;
  flex-grow: 1;
`
const StyledUl = styled.ul`
  width: 800px;
  display: inline-flex;
  flex-wrap: wrap; /*important for new row*/
  align-items: center;
  padding: 1px;
  margin: 0;
  overflow: ${(props) => props.isCollapsed ? 'hidden' : 'visible'};
  height: ${(props) => props.isCollapsed ? '44px' : 'auto'};
`

const Chips = () => {
  const { chips, inputCollapsed, setInputCollapsed, addChip, deleteChip } = React.useContext(ChipsContext);
  const [aggregatedChips, setAggregatedChips] = React.useState(chips);
  const [isOverflowed, setIsOverflowed] = React.useState(false);
  const [chipSub, setChipSub] = React.useState(0);
  const [firstLine, setFirstLine] = React.useState(0);
  const [gotFirst, setGotFirst] = React.useState(0);
  const { handleSubmit } = useInputHandler(addChip);
  const chipsContainerRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const handleBlur = () => {
    handleSubmit();
    inputRef.current.blur();
    inputRef.current.value = '';
    inputRef.current.style.display = "none";
    setInputCollapsed(true);
  }

  const handleFocus = () => {
    inputRef.current.style.display = "block";
    inputRef.current.focus();
    setInputCollapsed(false);
  }

  const handleOnDelete = (_, index) => {
    setGotFirst(false);
    setChipSub(0);
    const updatedAggs = deleteChip(index);
    setAggregatedChips(updatedAggs);
  }

  const getOverflowedEls = () => {
    if (chipsContainerRef.current) {
      // convert nodeList to array and exclude the input 
      const chipsArr = [].slice.call(chipsContainerRef.current.childNodes);
      const hiddenChipsArr = chipsArr.filter(chip => {
        if (chip.childNodes.length > 0) {
          if (chip.childNodes[0].type !== 'textarea') {
            return (chip.offsetTop + chip.offsetHeight > chip.parentNode.clientHeight)
              || (chip.offsetLeft + chip.offsetWidth > chip.parentNode.clientWidth);
          }
        } else {
          return (chip.offsetTop + chip.offsetHeight > chip.parentNode.clientHeight)
            || (chip.offsetLeft + chip.offsetWidth > chip.parentNode.clientWidth);
        }
      });
      return hiddenChipsArr;
    }
    return 0;
  }

  const setDisplayedChips = chipSub => {
    let overflowedEls = 0;
    // getting first line, only once and remeber.
    // will get reset when after deleting - when first line maybe changed 
    if (!gotFirst) {
      overflowedEls = getOverflowedEls().length;
      setFirstLine(overflowedEls)
      setGotFirst(true)
    } else {
      overflowedEls = firstLine;
    }
    const visibleChipsCount = chips.length - overflowedEls;
    const visibleChipsArr = [...chips].splice(0, visibleChipsCount - chipSub);
    setAggregatedChips(visibleChipsArr)
  }

  const getChips = () => {
    if (inputCollapsed && chipSub > 0) {
      return aggregatedChips;
    } else {
      return chips;
    }
  }

  // light overflow checker
  const isEllipsisActive = e => {
    return (e.current.offsetHeight < e.current.scrollHeight) || (e.current.offsetWidth < e.current.scrollWidth);
  }

  React.useEffect(() => {
    if (isEllipsisActive(chipsContainerRef) && !isOverflowed) {
      setIsOverflowed(!isOverflowed);
    }
    // condition for aggregating 
    if (inputCollapsed && getOverflowedEls().length > 0) {
      setDisplayedChips(chipSub)
      let more = chipSub + 1;
      setChipSub(more);
    }
  }, [chips, inputCollapsed, aggregatedChips])

  return (
    <StyledUl isCollapsed={inputCollapsed}
      ref={chipsContainerRef}
      onClick={handleFocus}
      onBlur={handleBlur}>
      {
        getChips().map((chip, index) => (
          <StyledLi key={uuid()} >
            <Chip isNotFirst={index}
              index={uuid()}
              chip={chip}
              isCollapsed={inputCollapsed}
              onDelete={e => handleOnDelete(e, index)} />
          </StyledLi>
        ))
      }
      <StyledLi>
        {
          inputCollapsed && chipSub > 0 &&
          (chips.length - aggregatedChips.length) > 0 &&
          < AggChip text={chips.length - aggregatedChips.length || ''} />
        }
      </StyledLi>
      <StyledInputLi>
        <To ref={inputRef} />
      </StyledInputLi>
    </StyledUl>

  );
}

export default Chips;
