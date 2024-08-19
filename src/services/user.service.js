const { prisma } = require("../config/database");

async function getAllUsersService() {
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

async function getUserInfoService(req) {
    const session = req.session;
    const userId = session.getUserId();

    const userInfo = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (userInfo) {
        return userInfo;
    } else {
        throw new Error("User not found");
    }
}

module.exports = { getUserInfoService, getAllUsersService };
