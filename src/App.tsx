import React from 'react'
import LearnUseState from './LearnUseState'
import LearnUseReducer from './LearnUseReducer'
import LearnUseContext from './LearnUseContext'
import LearnUseEffect from './LearnUseEffect'

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
    </div>
  );
}

export default App;
