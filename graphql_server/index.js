const { GraphQLServer } = require("graphql-yoga");
const {prisma} = require('./src/generated/prisma-client')
// let links = [ 
//   {
//     id: "link-0",
//     description: "Full Stack tutorial for graphql",
//     url: "www.howtograpgql.com"
//   }
// ];
// let idCount = links.length;
const resolvers = {
//   Query: {
//     info: () => "This is the API of hackernews clone",
//     feed: () => links,
//     link: (parent, args) => {
//       return links.find(link => link.id === args.id);
//     }
//   },
//   Mutation: {
//     postLink: (parent, args) => {
//       const link = {
//         id: `link-${idCount++}`,
//         description: args.description,
//         url: args.url
//       };
//       links.push(link);
//       return link;
//     },
//     updateLink: (parent, args) => {
//       const link = {
//         id: args.ID,
//         description: args.description,
//         url: args.url
//       };
//       links.push(link);
//       return link;
//     },
//     deleteLink: (parent, args) => {
//       const deletedLink = links.find(link => link.id === args.id);
//       const index = links.indexOf(deletedLink);
//       links.pop(index);
//       return deletedLink;
//     }
//   }
    Query:{
        info:() => "This is the API of HarckerNews clone",
        feed:(root ,args , context ,info) => {
            return context.prisma.links()
        }
    },
    Mutation: {
        postLink: (root ,args , context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        }
    }
};
// Link:{
//     id:(parent) => parent.id,
//     description:(parent) => parent.description,
//     url:(parent)=> parent.url
// }
// }

// const server = new GraphQLServer({
//   typeDefs: "./schema.graphql",
//   resolvers,
// });

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
    context: {prisma}
  });

server.start(() =>
  console.log("GraphQl Server is running on the http://localhost:4000")
);
