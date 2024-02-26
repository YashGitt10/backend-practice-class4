

const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((error) => {
        console.log("ERRORS", error);
        process.exit(1);
    });
};

module.exports = connectWithDb;