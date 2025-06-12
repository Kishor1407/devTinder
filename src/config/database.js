const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kishorhegge1419:Kishor1407@cluster0.nsgxm1e.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
