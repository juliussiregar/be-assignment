require('dotenv').config();
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Session = require("supertokens-node/recipe/session");

const SuperTokensConfig = {
    framework: "fastify",
    supertokens: {
        connectionURI: process.env.CONNECTION_URI || "http://localhost:3567",
    },
    appInfo: {
        appName: process.env.APP_NAME || "MyApp",
        apiDomain: process.env.API_DOMAIN || "http://localhost:3000",
        websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:3000",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init({
            cookieSecure: process.env.NODE_ENV === "production",
            cookieSameSite: "lax",
            sessionTokenInHeader: true,  // For automatic token inclusion in headers
        }),
    ],
};

module.exports = SuperTokensConfig;
