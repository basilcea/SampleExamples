const {GraphQLServer} = require('graphql-yoga')


const typeDefs = `
    type Query {
        info : String!
    }
`

const resolvers = {
    Query : {
        info : () => null ,
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('GraphQl Server is running on the http://localhost:4000'))