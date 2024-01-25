// ormconfig.js
const dotenv = require('dotenv');
dotenv.config();
var username = encodeURIComponent("favio");
var password = encodeURIComponent("ph42wz4NUqGEMxmU");
var connectionString = `mongodb+srv://${username}:${password}@cluster0.htgjmgw.mongodb.net`;


module.exports = {
    type: 'mongodb',
    host: connectionString, // Your MongoDB server hostname
    port: 27017,       // Your MongoDB server port
    database: 'construex', // Your database name
    entities: [__dirname + 'tasks/**/*.entity{.ts,.js}'],
    synchronize: true, // Set to true for development, but false for production
};
