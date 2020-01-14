import jwt from 'jsonwebtoken'

export const AppSecret = process.env.APP_SECRET

export const verifyToken = (context) => {
    const {token} = context.request.get('Cookie') || ''
    console.log(Authorization)
    if (token){
        const {userId} = jwt.verify(token, AppSecret)
        return userId
    }
    throw new Error ('Not Authenticated')
}
export const generateCookie = (args, context) => {
    const token = jwt.sign({id: args.id}, AppSecret)
    return context.request.cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false,
        httpOnly: true
    })
}