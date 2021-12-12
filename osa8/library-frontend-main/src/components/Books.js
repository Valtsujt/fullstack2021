
import React from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  let books = []
  if (result.data) {
    books = result.data.allBooks
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            console.log(genre)
            if(genre === null || a.genres.includes(genre)) {
              return (<tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
            }
            return null
          }

          )}
        </tbody>
      </table>
      {books.map(b => {
        return b.genres
      }).flat().filter((value, index, self) => self.indexOf(value) === index).map(genre => {
        return <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      }
      
      )



      }
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books