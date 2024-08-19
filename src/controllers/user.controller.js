const { getUserInfoService } = require("../services/user.service");

async function getUserInfo(req, reply) {
    try {
        const response = await getUserInfoService(req);
        reply.send(response);
    } catch (error) {
        reply.status(500).json({ error: error.message });
    }
}

module.exports = { getUserInfo };
