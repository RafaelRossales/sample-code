//Import the mongoose module
const mongoose = require('mongoose');

// Creating a singleton class to handle database connection
class Database { 

    connection = mongoose.connection;

    constructor() {
    try {
        this.connection
        .on('open', console.info.bind(console, 'Database connection: open'))
        .on('close', console.info.bind(console, 'Database connection: close'))
        .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
        .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
        .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
        .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
        .on('all', console.info.bind(console, 'Database connection: all'))
        .on('error', console.error.bind(console, 'MongoDB connection: error:'));
    } catch (error) {
        console.error(error);
    }
    }

    async connect(username, password, dbname) {
    try {
        await mongoose.connect(
        `mongodb+srv://${username}:${password}@localhost:27017/`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize:10
        }
        );
    } catch (error) {
        console.error(error);
    }
    }

    async close() {
    try {
        await this.connection.close();
    } catch (error) {
        console.error(error);
    }
    }
}

const mongodb = new Database();

mongodb.connect();


module.exports = mongodb;