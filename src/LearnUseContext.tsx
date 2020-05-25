import * as React from 'react'
import {createContext, useContext, useState} from 'react'

type TTheme = {
  success: string
}

const initTheme = {
  success: 'green'
}

const Context = createContext<TTheme | null>(null)

const LearnUseContext: React.FC = () => {
  const [theme] = useState(initTheme)

  return (
    <Context.Provider value={theme}>
      <h1>useContext</h1>
      <div>
        爸爸得到的值: {theme.success}
        <Child/>
      </div>
    </Context.Provider>
  )
}

const Child: React.FC = () => {
  const theme = useContext(Context)

  return (
    <div>
      儿子得到的值: {theme!.success}
      <GrandChild/>
    </div>
  )
}

const GrandChild: React.FC = () => {
  const theme = useContext(Context)

  return (
    <div>孙子得到的值: {theme?.success}</div>
  )
}

export default LearnUseContext
