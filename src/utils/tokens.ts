import jwt from 'jsonwebtoken'
export const createActivationToken= (payload:any) => {
    return jwt.sign(payload, process.env.NEXT_PUBLIC_ACTIVATION_TOKEN_SECRET || '', {
        expiresIn: "2d"
    })
}