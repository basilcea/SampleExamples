import { GraphQLServer } from "graphql-yoga";
import {prisma} from './src/generated/prisma-client';
import Query from './src/resolvers/Query'
import * as Mutation from './src/resolvers/Mutation'
import * as User from './src/resolvers/User'
import * as Link from './src/resolvers/Links'
import * as Vote from './src/resolvers/Vote'
import * as Subscription from "./src/resolvers/Subscription"
import CookieParser from 'cookie-parser'
import cors from 'cors';
import {crsfProtection} from './src/middleware'

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
const crsfProtection = csurf({cookie:true})

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,

  }
  
const server = new GraphQLServer({
    typeDefs: "schema.graphql",
    resolvers,
    context: request => {
        return {
            ...request,
            prisma}
        },
    middlewares:[crsfProtection]
  });
server.use(cors(
  {
    origin: [
      `${process.env.FRONT_URL}`
    ],
    credentials: true
}))
server.use(CookieParser())
server.start(() =>
  console.log("GraphQl Server is running on the http://localhost:4000")
);
