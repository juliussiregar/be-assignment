const { signUp, signIn, signOut } = require('../controllers/auth.controller');
const { VerifySession } = require('../middlewares/session.middleware');  // Pastikan VerifySession diimpor dengan benar

async function authRoutes(fastify) {
  fastify.post('/signup', signUp);
  fastify.post('/signin', signIn);
  fastify.post('/signout', { preHandler: VerifySession() }, signOut); // Pastikan VerifySession digunakan dengan benar
}

module.exports = authRoutes;
