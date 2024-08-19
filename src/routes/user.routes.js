const { verifySession } = require("supertokens-node/recipe/session/framework/fastify");

async function userRoutes(fastify) {
    fastify.get("/sessioninfo", { preHandler: verifySession() }, async (req, reply) => {
        let session = req.session;
        reply.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getAccessTokenPayload(),
        });
    });
}

module.exports = userRoutes;
