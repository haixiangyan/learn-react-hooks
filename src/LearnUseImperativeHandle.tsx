import * as React from 'react'
import {useEffect, useImperativeHandle, useRef} from 'react'

const LearnUseImperativeHandle: React.FC = () => {
  const myButton = useRef(null)

  useEffect(() => {
    console.log('有人改了我的 ref', myButton)
  })

  return (
    <div>
      <OKButton ref={myButton}/>
    </div>
  )
}

const OKButton = React.forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      x: 'hello'
    }
  })
  return <button>按钮</button>
})

export default LearnUseImperativeHandle
