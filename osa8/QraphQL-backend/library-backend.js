const { ApolloServer, UserInputError,AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')



/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/


const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]
        id: String!
      }
    type Author {
        name : String
        bookCount: Int
        id: String!
        born:Int
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
      }
      
      type Token {
        value: String!
      }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            published: Int
            authorName: String!
            authorBorn: Int
            genres: [String]
        ): Book
        editAuthor(
            name: String
            setBornTo: Int
            
            ):Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token    
      }
  
`
// const authors = () => {
//     return books.map(item => item.author).filter((value, index, self) => self.indexOf(value) === index)
// }

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            // let booklist = []
            // if (args.author) {
            //     booklist = books.filter(book => book.author === args.author)
            // } else {
            //     booklist = books
            // }

            if (args.genre) {
                return await Book.find({ genre: { $in: [args.genre] } }.populate('author'))
            }
            return await Book.find({}).populate('author')
        },
        // allAuthors: () => authors.map(author => {

        //     return {
        //         "name": author.name,
        //         "bookCount": books.filter(item => item.author === author.name).length,
        //         "id": author.id,
        //         "born": author.born
        //     }
        // })

        allAuthors: async () => {
            let result = await Author.find({})
            let books = await Book.find({})

            console.log(result)
            console.log(books)
            result = result.map(a => {
                author = a
                author.bookCount = books.filter(book => book.author.str === a._id.str).length
                return author
            })
            return result
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            let author
            author = await Author.findOne({ name: args.authorName })
            if (!author) {
                author = new Author({
                    name: args.authorName,
                    born: args.authorBorn
                })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }
            const objc = {
                title: args.title,
                published: args.published,
                genres: args.genres,
                author: author
            }
            const book = new Book(objc)
            // if (authors.filter(author => author.name === args.author).length === 0) {
            //     let author = {
            //         name: args.author,
            //         id: uuid(),
            //         born: null
            //     }
            //     authors = authors.concat(author)
            // }

            try {
                let value = await book.save()
                return value
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            // let authorI = authors.findIndex(author => author.name === args.name)
            // if (authorI < 0) return null
            // let author = authors[authorI]
            // let newAuthor = { ...author, born: args.setBornTo }
            // console.log(newAuthor)
            // console.log(authors)
            // authors = authors.map(a => a.name === args.name ? newAuthor : a)
            // console.log(authors)

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'password') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})