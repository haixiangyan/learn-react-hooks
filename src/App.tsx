import React from 'react'
import LearnUseState from './LearnUseState'
import LearnUseReducer from './LearnUseReducer'
import LearnUseContext from './LearnUseContext'
import LearnUseEffect from './LearnUseEffect'
import LearnUseMemo from './LearnUseMemo'
import LearnUseRef from './LearnUseRef'

function App() {
  return (
    <div>
      <LearnUseState/>
      <hr/>
      <LearnUseReducer/>
      <hr/>
      <LearnUseContext/>
      <hr/>
      <LearnUseEffect/>
      <hr/>
      <LearnUseMemo/>
      <hr/>
      <LearnUseRef/>
    </div>
  );
}

export default App;
