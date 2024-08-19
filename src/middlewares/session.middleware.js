const { verifySession } = require("supertokens-node/recipe/session/framework/fastify");

function VerifySession() {
    return verifySession();
}

module.exports = { VerifySession };
