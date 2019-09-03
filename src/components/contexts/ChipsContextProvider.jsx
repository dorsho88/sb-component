import React from "react";
import { ChipsContext } from "./ChipsContext";

const ChipsContextProvider = (props) => {
  const [chips, setChips] = React.useState([]);
  const [inputCollapsed, setInputCollapsed] = React.useState(false);

  const addChip = email => {
    setChips([...chips, email]);
  };

  const deleteChip = index => {
    let newChips = [...chips].filter((_, idx) => {
      return index !== idx;
    })
    setChips(newChips);
    return newChips;
  }

  return (
    <ChipsContext.Provider value={{ chips, setChips, addChip, deleteChip, inputCollapsed, setInputCollapsed }}>
      {props.children}
    </ChipsContext.Provider>
  );
};

export default ChipsContextProvider;