const { prisma } = require("../config/database");

async function createTransaction(data) {
    return await prisma.transaction.create({
        data,
    });
}

async function getTransactionsByAccount(accountId) {
    return await prisma.transaction.findMany({
        where: { accountId },
    });
}

module.exports = {
    createTransaction,
    getTransactionsByAccount,
};
