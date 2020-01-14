import {generateCookie, verifyToken} from "../utils"
const signup = async(parent , args , context , info) => {
    const password = await bcrypt.hash(args.password ,10)
    const user = await context.prisma.createUser({...args , password})
    generateCookie({id:user.id})
    return {user}

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
    generateCookie({id:user.id})
    return {token, user }
}