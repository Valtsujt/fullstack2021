const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Book {
        title: String!
        published: Int
        author: String!
        genres: [String]
        id: String!
      }
    type Author {
        name : String
        bookCount: Int
        id: String!
        born:Int
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
    }
    type Mutation {
        addBook(
            title: String!
            published: Int
            author: String!
            genres: [String]
        ): Book
        editAuthor(
            name: String
            setBornTo: Int
            
            ):Author
      }
  
`
// const authors = () => {
//     return books.map(item => item.author).filter((value, index, self) => self.indexOf(value) === index)
// }
const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let booklist = []
            if (args.author) {
                booklist = books.filter(book => book.author === args.author)
            } else {
                booklist = books
            }

            if (args.genre) {
                booklist = booklist.filter(book => book.genres.includes(args.genre))
            }
            return booklist
        },
        allAuthors: () => authors.map(author => {

            return {
                "name": author.name,
                "bookCount": books.filter(item => item.author === author.name).length,
                "id":author.id,
                "born":author.born
            }
        })
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id: uuid() }
            if (authors.filter(author => author.name === args.author).length === 0) {
                let author = {
                    name: args.author,
                    id:uuid(),
                    born: null
                }
                authors = authors.concat(author)
            }
            books = books.concat(book)
            return book
        },
        editAuthor: (root, args) => {
            let authorI = authors.findIndex(author => author.name ===args.name) 
            if(authorI < 0) return null
            let author = authors[authorI]
            let newAuthor = {...author, born:args.setBornTo}
            console.log(newAuthor)
            console.log(authors)
            authors = authors.map(a => a.name === args.name ? newAuthor : a)
            console.log(authors)

            return newAuthor
        }

        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})