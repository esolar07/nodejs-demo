import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const verifyPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

export const hashPassword = (password) => bcrypt.hash(password, 5)

export const createJwt  = (user) => {
    return jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET
    )
}

export const userAuthentication = (req, res, next) => {
    const bearerToken = req.headers.authorization,
        [, token] = bearerToken.split(' ')
     console.log(token)
    if (!bearerToken || !token) {
        res.status(401)
        res.json({message: 'Not Authorized'})
        return
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        console.log(e)
        res.status(401)
        res.json({message: 'Not a Valid Token'})
        return
    }

    // export default function authHeader() {
    //     const userStr = localStorage.getItem("user");
    //     let user = null;
    //     if (userStr)
    //         user = JSON.parse(userStr);
    //
    //     if (user && user.accessToken) {
    //         return { Authorization: 'Bearer ' + user.accessToken };
    //     } else {
    //         return { Authorization: '' };
    //     }
    // }


}