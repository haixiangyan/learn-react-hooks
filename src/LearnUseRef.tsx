import * as React from 'react'
import {useEffect, useRef, useState} from 'react'

const LearnUseRef: React.FC = () => {
  const [x, setX] = useState(0)
  const y = useRef(0)

  const myButton = useRef(null)

  useEffect(() => {
    y.current += 1
  }, [])

  const changeX = () => setX(x + 1)
  const changeY = () => y.current += 1

  return (
    <div>
      <h1>useRef</h1>
      <button onClick={changeX}>x + 1</button>
      <button onClick={changeY}>y + 1</button>
      <div>x 的值 {x}</div>
      <div>y 的值 {y.current}</div>

      <OKButton ref={myButton}/>
    </div>
  )
}

const Button = (props: any, ref: any) => {
  return <button className="red" ref={ref}>用作 ref 的按钮</button>
}

const OKButton = React.forwardRef(Button)

export default LearnUseRef
