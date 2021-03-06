import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre:String){
    allBooks(genre:$genre)  {
      title
      published
      author{
        name
        id
        born
      }
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $authorName: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      authorName: $authorName,
      genres: $genres
    ) {
      title
      published
      id
      author{
        name
        born
      }
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVGENRE = gql`
  
    query{
      me{
        favoriteGenre
      }
    }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      id
      author{
        name
        born
      }
      genres
    }
  }
  
`
