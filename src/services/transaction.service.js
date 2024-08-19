const { createTransaction } = require("../models/transaction.model");

function processTransactionService(transaction) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Transaction processing started for:', transaction);
            const savedTransaction = await createTransaction(transaction);

            // Simulate long running process
            setTimeout(async () => {
                console.log('transaction processed for:', savedTransaction);
                // Update transaction status
                const updatedTransaction = await prisma.transaction.update({
                    where: { id: savedTransaction.id },
                    data: { status: "completed" }
                });
                resolve(updatedTransaction);
            }, 30000); // 30 seconds
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    processTransactionService,
};
