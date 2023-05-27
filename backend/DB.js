const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" })
const uri = process.env.DB_URL;
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
async function dbConnect() {
  mongoose.connect(uri,connectionParams)
  .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
