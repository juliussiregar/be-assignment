const { send, withdraw, getAllTransactions } = require('../controllers/transaction.controller');
const { verifySession } = require("supertokens-node/recipe/session/framework/fastify");

async function transactionRoutes(fastify) {
  fastify.post('/send', { preHandler: verifySession() }, send);
  fastify.post('/withdraw', { preHandler: verifySession() }, withdraw);
  fastify.get('/transactions/:accountId', { preHandler: verifySession() }, getAllTransactions);
}

module.exports = transactionRoutes;
