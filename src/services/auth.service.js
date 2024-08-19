const EmailPassword = require("supertokens-node/recipe/emailpassword");

async function signUpService(formFields) {
    const email = formFields.find(field => field.id === 'email').value;
    const password = formFields.find(field => field.id === 'password').value;

    const signUpResponse = await EmailPassword.signUp({ email, password });

    if (signUpResponse.status === "OK") {
        return { status: "User signed up successfully", user: signUpResponse.user };
    } else {
        throw new Error(signUpResponse.status);
    }
}

async function signInService(formFields) {
    const email = formFields.find(field => field.id === 'email').value;
    const password = formFields.find(field => field.id === 'password').value;

    const signInResponse = await EmailPassword.signIn({ email, password });

    if (signInResponse.status === "OK") {
        return { status: "User signed in successfully", user: signInResponse.user };
    } else {
        throw new Error(signInResponse.status);
    }
}

module.exports = { signUpService, signInService };
