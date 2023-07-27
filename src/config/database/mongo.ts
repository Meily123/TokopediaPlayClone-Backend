require('dotenv').config();
const mongoose = require("mongoose");

const DATABASE_URL = process.env.MONGO_CONNECTION_STRING!;

const connect = () => {
    // Connecting to the database
    mongoose
        .connect(DATABASE_URL)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log(`ERROR CONNECTING TO DATABASE: ${error}`);
            process.exit(1);
        });
};

export default connect;