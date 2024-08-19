const { prisma } = require('./database');

async function testDatabaseConnection() {
    try {
        console.log("Starting testDatabaseConnection...");

        const newUser = await prisma.user.create({
            data: {
                email: 'testuser@example.com',
                password: 'password123',
            },
        });

        console.log('User created:', newUser);
    } catch (err) {
        console.error("Error creating user:", err);
    }
}

testDatabaseConnection().catch((e) => {
    console.error("Unhandled error:", e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
    console.log("Disconnected from the database");
});
