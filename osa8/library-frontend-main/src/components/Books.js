
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { BOOK_ADDED } from '../queries'
import { useLazyQuery } from '@apollo/client';
const Books = (props) => {
  const [genre, setGenre] = useState(null)
  //const result = useQuery(ALL_BOOKS)
  const [getBooks, { loading }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "network-only"
})
  const [books, setBooks] = useState([])
  //let books = []
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      
      
      console.log("RAEWR")
      setBooks(books.concat(subscriptionData.data.bookAdded))
      window.alert(subscriptionData.data.bookAdded.title + " was just added!")

    }
  })

  useEffect(() => {
    console.log("useeffect called")
    console.log("s")
    const fetch = async () => {
      const result = await getBooks()
      if (result.data) {
        //setBooks(result.data.allBooks)
        //books = result.data.allBooks
        setBooks(result.data.allBooks)
      }
    }

    fetch() 
    
    

  }, []) // eslint-disable-line
  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
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
            if (genre === null || a.genres.includes(genre)) {
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