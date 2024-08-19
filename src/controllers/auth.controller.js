const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { createNewSession } = require("supertokens-node/recipe/session");
const { prisma } = require("../config/database");

async function signUp(req, reply) {
    try {
        const formFields = [
            {
                id: "email",
                value: req.body.email,
            },
            {
                id: "password",
                value: req.body.password,
            },
        ];

        // Sign up with SuperTokens using formFields
        const signUpResponse = await EmailPassword.signUp({ formFields });

        if (signUpResponse.status === "OK") {
            // Simpan pengguna di database
            await prisma.user.create({
                data: {
                    email: req.body.email,
                    password: req.body.password, // ideally, store hashed password
                    name: req.body.name || null,
                },
            });

            reply.send({ status: "User signed up successfully" });
        } else {
            reply.status(400).send({ status: "Error during sign-up", message: signUpResponse.status });
        }
    } catch (err) {
        reply.status(500).send({ message: err.message });
    }
}

async function signIn(req, reply) {
    try {
        const formFields = [
            {
                id: "email",
                value: req.body.email,
            },
            {
                id: "password",
                value: req.body.password,
            },
        ];

        // Sign in with SuperTokens using formFields
        const signInResponse = await EmailPassword.signIn({ formFields });

        if (signInResponse.status === "OK") {
            // Create a session
            await createNewSession(req, reply, signInResponse.user.id);

            // Token will be automatically included in headers
            reply.send({ status: "User signed in successfully" });
        } else {
            reply.status(400).send({ status: "Error during sign-in", message: signInResponse.status });
        }
    } catch (err) {
        reply.status(500).send({ message: err.message });
    }
}

async function signOut(req, reply) {
    try {
        await req.session.revokeSession();
        reply.send({ status: "User signed out successfully" });
    } catch (err) {
        reply.status(500).send({ message: err.message });
    }
}

module.exports = { signUp, signIn, signOut };
