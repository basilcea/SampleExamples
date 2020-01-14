import { GraphQLServer } from "graphql-yoga";
import {prisma} from './src/generated/prisma-client';
import Query from './src/resolvers/Query'
import * as Mutation from './src/resolvers/Mutation'
import User from './src/resolvers/User'
import Links from './src/resolvers/Links'
import CookieParser from 'cookie-parser'

// let links = [ 
//   {
//     id: "link-0",
//     description: "Full Stack tutorial for graphql",
//     url: "www.howtograpgql.com"
//   }
// ];
// // let idCount = links.length;
// const resolvers = {
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
//     Query:{
//         info:() => "This is the API of HarckerNews clone",
//         feed:(root ,args , context ,info) => {
//             return context.prisma.links()
//         }
//     },
//     Mutation: {
//         postLink: (root ,args , context) => {
//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description
//             })
//         }
//     }
// };
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

const resolvers = {
    Query,
    Mutation,
    User,
    Links
  }
  
const server = new GraphQLServer({
    typeDefs: "schema.graphql",
    resolvers,
    context: request => {
        return {
            ...request,
            prisma}
        }
  });
server.use(CookieParser())
server.start(() =>
  console.log("GraphQl Server is running on the http://localhost:4000")
);
