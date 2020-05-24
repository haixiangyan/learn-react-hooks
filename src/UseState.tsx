import * as React from 'react'
import {useState} from 'react'

const UseState: React.FC = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(100)
  const [obj, setObj] = useState({name: 'Jack', age: 18})
  const [onlyRunAtFirstTime, change] = useState(() => {
    console.log('只在第一次渲染时执行，这里可以假设 9 + 9 是一些复杂的操作')

    return {name: 'Jack', age: 9 + 9}
  })

  const onClickX = () => setX(x + 1)
  const onClickY = () => setY((prevX) => prevX + 1)
  const onClickObj = () => setObj({
    ...obj,
    age: obj.age + 1
  })
  const onClickFirst = () => change({...onlyRunAtFirstTime})

  return (
    <div>
      <h1>useState</h1>
      <button onClick={onClickX}>x + 1</button>
      <p>x: {x}</p>

      <button onClick={onClickY}>y + 1</button>
      <p>y: {y}</p>

      <button onClick={onClickObj}>age + 1</button>
      <p>{JSON.stringify(obj)}</p>

      <button onClick={onClickFirst}>只有在第一次</button>
    </div>
  )
}

export default UseState
