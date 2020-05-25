import * as React from 'react'
import {useEffect, useState} from 'react'

const ajax = (name: string, callback: Function) => {
  setTimeout(() => {
    callback([
      {id: 1, name: '钢铁侠'},
      {id: 2, name: '蜘蛛侠'},
      {id: 3, name: '复联'},
    ])
  }, 2000)
}

const LearnUseEffect: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => { // 对应 componentDidMount
    console.log('刚开始就执行，要在这里去获取 movies')

    ajax('movies', (newMovies: any[]) => setMovies(newMovies))
  }, [])
  useEffect(() => { // 对应 componentDidUpdate
    console.log('只要有东西更新了，我就执行')
  })
  useEffect(() => { // 对应 componentDidUpdate，但是只有 movies 更新才执行
    console.log('movies 更新了，所以我执行了')
  }, [movies])

  return (
    <div>
      <h1>useEffect</h1>
      {
        movies.length === 0 ?
          <div>加载中</div> :
          <ul>
            {movies.map(m => <li key={m.id}>{m.name}</li>)}
          </ul>
      }
    </div>
  )
}

export default LearnUseEffect
