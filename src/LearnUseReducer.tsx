import * as React from 'react'
import {useReducer} from 'react'

type TState = {
  name: string
  age: number
}

type TAction = {
  type: string
  user?: TState
}

const initState: TState = {
  name: 'Jack',
  age: 18
}

const reducer = (state: TState, action: TAction) => {
  const {type} = action

  switch (type) {
    case 'addAge':
      return {...state, age: state.age + 1}
    case 'minusAge':
      return {...state, age: state.age - 1}
    case 'update':
      return {...state, ...action.user}
    default:
      throw new Error('没有传入 type')
  }
}

const LearnUseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const onAdd = () => dispatch({type: 'addAge'})
  const onMinus = () => dispatch({type: 'minusAge'})
  const onUpdate = () => dispatch({type: 'update', user: {name: 'Tom', age: 20}})

  return (
    <div>
      <h1>useReducer</h1>
      <button onClick={onAdd}>age + 1</button>
      <button onClick={onMinus}>age - 1</button>
      <button onClick={onUpdate}>更新整个user</button>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}

export default LearnUseReducer
