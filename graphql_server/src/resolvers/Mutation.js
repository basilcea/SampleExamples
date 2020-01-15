import {generateCookie, verifyToken} from "../utils"
import bcrypt from "bcryptjs"

export const signup = async(parent , args , context , info) => {
    const password = await bcrypt.hash(args.password ,10)
    const user = await context.prisma.createUser({...args , password})
    generateCookie({id:user.id}, context.request)
    return user

}
export const login = async(parent, args ,context , info) => {
    const user = await context.prisma.user({email: args.email})
    if(!user) {
        throw new Error ('No such user found')
    }
    const valid =  bcrypt.compare(args.password , user.password)
    if(!valid) {
        throw new Error ('Invalid Password')
    }
    generateCookie({id:user.id}, context.request)
    return user
}

export const post = async(parent , args, context , info) => {
    const userId = await verifyToken(context.request)
    return context.prisma.createLink({
        url: args.url,
        description:args.description,
        postedBy: {connect: {id: userId}}
    })
}

export const vote = async(parent , args ,context) => {
    const userId = await verifyToken(context.request)
    // check if user has not voted for the link
    const userHasVoted = await context.prisma.$exists.vote({
        user: {id :userId},
        link:{id :args.linkId},
    })
    if(userHasVoted) {
        const votedLink = context.prisma.link({id: args.linkId}).url()
        throw new Error (`Already voted for ${votedLink}`)
    }
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      })
}

