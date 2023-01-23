import prisma from "../db";
import {createJwt, hashPassword, verifyPassword} from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: await hashPassword(req.body.password)
        }
    })
    const userToken = createJwt(user)
    await res.json({userToken})
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    const isAuthenticatedUser = await verifyPassword(req.body.password, user.password)

    if (!isAuthenticatedUser) {
        res.status(401)
        await res.json({message: 'Not Authorized'})
        return
    }
    const userToken = createJwt(user)
    await res.json({userToken})
}