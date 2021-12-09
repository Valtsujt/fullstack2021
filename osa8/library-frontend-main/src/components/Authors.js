import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  if (!props.show) {
    return null
  }
  let authors = []
  if (result.data) {
    authors = result.data.allAuthors
  }

  const submit = async (event) => {
    event.preventDefault()
    let intborn = parseInt(born)
    console.log('add book...')
    console.log(name, intborn)
    let objc = { variables: { name: name.value, setBornTo: intborn } }
    console.log(objc)
    editAuthor(objc)
    setName(null)
    setBorn('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>


      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={name}
            onChange={setName}
            options={authors.map(a => {
              return { value: a.name, label:a.name}
            })}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors