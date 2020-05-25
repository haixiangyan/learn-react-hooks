import * as React from 'react'
import {useMemo, useState} from 'react'

const LearnUseMemo: React.FC = () => {
  const [x, setX] = useState(0)

  const onClickX = () => setX(x + 1)

  const onChild3Click = () => {}

  const onMemoClick = useMemo(() => {
    return () => console.log("点击了")
  }, [])

  return (
    <div>
      <h1>useMemo</h1>
      <button onClick={onClickX}>x + 1</button>
      <Child/>
      <Child2/>
      <Child3 onChild3Click={onChild3Click}/>
      <Child4 onChild3Click={onMemoClick}/>
    </div>
  )
}

const Child: React.FC = () => {
  console.log('我是儿子，为什么要搞我')

  return <div>我是儿子，别搞我</div>
}

const Child2 = React.memo(() => {
  console.log('我是儿子2，别想搞我')

  return <div>我是儿子2，别搞我</div>
})

const Child3 = React.memo((props: any) => {
  console.log('我是儿子3，用了 memo 还能搞到我？')

  return <div onClick={props.onChild3Click}>我是儿子3，用了 memo 还能搞到我？</div>
})

const Child4 = React.memo((props: any) => {
  console.log('我是儿子4，用了 useMemo 终于搞不了我了')

  return <div onClick={props.onChild3Click}>我是儿子4，用了 useMemo 终于搞不了我了？</div>
})

export default LearnUseMemo
