import prisma from "../db";

export const getSpeeches = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            speechs: true
        }
    })
    res.json({data: user.speechs})
}