const { processTransactionService } = require("../services/transaction.service");
const { getTransactionsByAccount } = require("../models/transaction.model");

async function send(req, reply) {
    try {
        const { accountId, amount, toAddress } = req.body;
        const transaction = {
            accountId,
            amount,
            toAddress,
            status: "processing",
            timestamp: new Date(),
        };

        // Process the transaction
        const result = await processTransactionService(transaction);

        reply.send({ status: "Transaction completed successfully", transaction: result });
    } catch (err) {
        reply.status(500).send({ message: err.message });
    }
}

async function withdraw(req, reply) {
    // Similar to send but for withdraw
}

async function getAllTransactions(req, reply) {
    try {
        const { accountId } = req.params;
        const transactions = await getTransactionsByAccount(accountId);
        reply.send(transactions);
    } catch (err) {
        reply.status(500).send({ message: err.message });
    }
}

module.exports = {
    send,
    withdraw,
    getAllTransactions,
};
