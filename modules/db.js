const mongoose = require("mongoose"); //import Mongoose

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const classSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      required: true,
   },
   time: {
      type: String,
      required: true,
   },
   instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
   },
});

const instructorSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   bio: {
      type: String,
      required: true,
   },
   imageUrl: {
      type: String,
   },
});

// Create Mongoose models for both collections
const Class = mongoose.model("Class", classSchema);
const Instructor = mongoose.model("Instructor", instructorSchema);

//MONGODB FUNCTIONS
async function connect() {
   await mongoose.connect(dbUrl); //connect to mongodb
}

module.exports = {
   Class,
   Instructor,
   connect,
};
