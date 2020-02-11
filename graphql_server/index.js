import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./src/generated/prisma-client";
import * as Query from "./src/resolvers/Query";
import * as Mutation from "./src/resolvers/Mutation";
import * as User from "./src/resolvers/User";
import * as Link from "./src/resolvers/Links";
import * as Vote from "./src/resolvers/Vote";
import * as Subscription from "./src/resolvers/Subscription";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from "cors";
import { csrfMiddleware } from "./src/middleware";
import { generateCsrf } from "./src/utils";
import csurf from "csurf";
import dotenv from "dotenv"
// import { request } from "https";

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
dotenv.config()

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};
const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  },
  // middlewares: [csrfMiddleware]
});
server.use(cookieParser());
server.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);
const Parser = bodyParser.urlencoded({ extended: false });


// server.use(csurf({cookie:true}))
// server.use('/', (req, res, next) => {
//   const token = req.csrfToken()
//   res.cookie('XSRF-TOKEN',  token)
//   next()
// })

server.start(() =>
  console.log("GraphQl Server is running on the http://localhost:4000")
);
