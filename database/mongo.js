const mongoose = require("mongoose");

async function Mongo(url) {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true })
        .then((result) => console.log("Connected to database: ", result.connections[0].host))
        .catch((error) => console.log("Error occurred connecting to database:\n", error));
}

module.exports = Mongo