const fastifyImport = require("fastify");
const cors = require("@fastify/cors");
const supertokens = require("supertokens-node");
const { plugin: SuperTokensFastifyPlugin, errorHandler } = require("supertokens-node/framework/fastify");
const SuperTokensConfig = require("./config/supertokens-config");
const { connectDB } = require("./config/database");
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const userRoutes = require('./routes/user.routes');

let fastify = fastifyImport();

// Inisialisasi SuperTokens dengan konfigurasi yang sudah diubah
supertokens.init(SuperTokensConfig);

// Middleware untuk menangani JSON body
fastify.register(require('@fastify/formbody'));

// Middleware untuk menangani CORS
fastify.register(cors, {
    origin: SuperTokensConfig.appInfo.websiteDomain,
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
});

// Daftarkan plugin SuperTokens untuk Fastify
fastify.register(SuperTokensFastifyPlugin);

// Penanganan error oleh SuperTokens
fastify.setErrorHandler(errorHandler());

// Rute Autentikasi
fastify.register(authRoutes, { prefix: '/auth' });

// Rute Transaksi
fastify.register(transactionRoutes, { prefix: '/transaction' });

// Rute Pengguna
fastify.register(userRoutes);

// Koneksi ke MongoDB
connectDB();

// Jalankan server
fastify.listen({ port: process.env.PORT || 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server berjalan pada ${address}`);
});
