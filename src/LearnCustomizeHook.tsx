import * as React from 'react'
import {useEffect, useState} from 'react'

type TBook = {
  id: string
  name: string
}

const useBooks = (initBooks: TBook[]) => {
  const [books, setBooks] = useState(initBooks)

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = () => {
    setTimeout(() => {
      setBooks([
        {id: '1', name: '一体'},
        {id: '2', name: '二体'},
        {id: '3', name: '三体'},
        {id: '4', name: '裸体'},
      ])
    }, 2000)
  }
  const addBooks = (newBook: TBook) => {
    setBooks([...books, newBook])
  }
  const editBooks = () => {/* put /books?id=xxx */}
  const deleteBooks = () => {/* delete /books?id=xxx */}

  return {
    books,
    getBooks,
    addBooks,
    editBooks,
    deleteBooks
  }
}

const LearnCustomizeHook: React.FC = () => {
  const {books} = useBooks([])

  return (
    <div>
      <h1>useBooks</h1>
      {
        books.length === 0?
          <div>加载中</div> :
          <ul>
            {
              books.map(b => <li key={b.id}>{b.name}</li>)
            }
          </ul>
      }
    </div>
  )
}

export default LearnCustomizeHook
