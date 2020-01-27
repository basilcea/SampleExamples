import jwt from 'jsonwebtoken'


export const AppSecret = process.env.APP_SECRET

export const generateCookies = (args, context) => {
    const token = jwt.sign({userId: args.id}, AppSecret)
    const auth = context.res.cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false,
        httpOnly: true
    })
    return auth
}
export const generateCsrf = (context) => {
    const surf = context.res.cookie('XSRF-TOKEN', context.request.csrfToken() )
    if (surf.err.code !== 'EBADCSRFTOKEN') {
        throw new Error ('CSRF ERROR')
    }
    return surf
}

export const verifyToken = (context) => {
   const tokenString = context.headers.cookies.split(';')[0]
    const token = tokenString.split("=")[1]
    if (token){
        const {userId} = jwt.verify(token, AppSecret)
        return userId
    }
    throw new Error ('Not Authenticated')
}


