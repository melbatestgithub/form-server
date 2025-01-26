require('dotenv').config();
const { Sequelize } = require("sequelize");

// Check if DATABASE_URL is set
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const sequelize = new Sequelize(databaseUrl, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Required for Render's SSL setup
        },
    },
});

// Authenticate and check connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
