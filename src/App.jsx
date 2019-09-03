import React from 'react';
import Recipients from './components/Recipients/Recipients';
import ChipsContextProvider from './components/contexts/ChipsContextProvider';


const App = () => {
  return (
    <ChipsContextProvider>
      <Recipients />
    </ChipsContextProvider>
  );
}

export default App;
