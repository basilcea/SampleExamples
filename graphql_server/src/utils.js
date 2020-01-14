import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config() 
export const AppSecret = process.env.APP_SECRET

export const verifyToken = (context) => {
   const tokenString= context.headers.cookies.split(';')[0]
    const token = tokenString.split("=")[1]
    if (token){
        const {userId} = jwt.verify(token, AppSecret)
        return userId
    }
    throw new Error ('Not Authenticated')
}
export const generateCookie = (args, context) => {
    const token = jwt.sign({userId: args.id}, AppSecret)
    const auth = context.res.cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false,
        httpOnly: true
    })
    return auth
}