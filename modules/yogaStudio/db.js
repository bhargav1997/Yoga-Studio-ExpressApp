const { mongoose } = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient class from mongodb driver

//DATABASE SETUP
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;
const client = new MongoClient(dbUrl); //create a MongoDB client

//set up Schema and model
const instructorSchema = new mongoose.Schema({
   name: String,
   bio: String,
   imageUrl: String,
});

const classSchema = new mongoose.Schema({
   type: String,
   date: Date,
   time: String,
   description: String,
   level: String,
});

const contacts = new mongoose.Schema({
   name: String,
   email: String,
   message: String,
});

// Create Mongoose models for both collections
const Class = mongoose.model("Class", classSchema);
const Instructor = mongoose.model("Instructor", instructorSchema);
const Contact = mongoose.model("Contact", contacts);

//MONGODB FUNCTIONS
const connect = async () => {
   try {
      db = client.db("yogastudio"); //select "yogastudio" to use
      return db;
   } catch (error) {
      console.error("Database connection error:", error);
   }
};

module.exports = {
   Class,
   Instructor,
   Contact,
   connect,
};
