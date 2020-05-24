import * as React from 'react'
import {useState} from 'react'

const UseState: React.FC = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(100)
  const [obj, setObj] = useState({name: 'Jack', age: 18})

  const onClickX = () => setX(x + 1)
  const onClickY = () => setY((prevX) => prevX + 1)
  const onClickObj = () => setObj({
    ...obj,
    age: obj.age + 1
  })

  return (
    <div>
      <h1>useState</h1>
      <button onClick={onClickX}>x + 1</button>
      <p>x: {x}</p>

      <button onClick={onClickY}>y + 1</button>
      <p>y: {y}</p>

      <button onClick={onClickObj}>age + 1</button>
      <p>{JSON.stringify(obj)}</p>
    </div>
  )
}

export default UseState
