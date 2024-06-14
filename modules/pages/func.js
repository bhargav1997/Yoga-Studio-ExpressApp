//DATABASE SETUP

const { Class, Instructor, Contact, connect } = require("../yogaStudio/db");
const { instructorsSampleData, classesSampleData } = require("../yogaStudio/sampleData");

const { ObjectId } = require("mongodb");

//MONGODB FUNCTIONS

async function initializeClasses() {
   let db = await connect();
   await db.collection("classes").insertMany(classesSampleData);
}

async function initializeInstructorData() {
   let db = await connect();
   await db.collection("instructors").insertMany(instructorsSampleData);
}

// Fetch Classes Data
async function getClasses() {
   let db = await connect();
   let classesData = await db.collection("classes").find({});
   return await classesData.toArray();
}

async function getClassesById(id) {
   let db = await connect();
   let classesData = await db.collection("classes").find({ _id: new ObjectId(id) });
   return await classesData.toArray();
}

async function getInstructors() {
   let db = await connect();
   let classesData = await db.collection("instructors").find({});
   return await classesData.toArray();
}

async function addNewClass(newClass) {
   let db = await connect();
   let status = await db.collection("classes").insertOne(newClass);
   // console.log("new class added");
   return status;
}

async function addNewInstructor(instructor) {
   let db = await connect();
   let status = await db.collection("instructors").insertOne(instructor);
   // console.log("new instructor added");
   return status;
}

//Function to delete one document from classes collection by _id.
async function deleteClassById(id) {
   let idFilter = { _id: new ObjectId(id) };
   let db = await connect();
   let result = await db.collection("classes").deleteOne(idFilter);
   if (result.deletedCount == 1) {
      console.log("class deleted");
   }
}

async function deleteInstructorById(id) {
   let idFilter = { _id: new ObjectId(id) };
   let db = await connect();
   let result = await db.collection("instructors").deleteOne(idFilter);
   if (result.deletedCount == 1) {
      console.log("instructor deleted");
   }
}

async function addContact(newContact) {
   let db = await connect();
   let status = await db.collection("contacts").insertOne(newContact);
   // console.log("new contact added");
   return status;
}
async function getContact() {
   let db = await connect();
   let contactData = await db.collection("contacts").find({});
   return await contactData.toArray();
}

module.exports = {
   getClasses,
   addNewClass,
   deleteClassById,
   initializeClasses,
   initializeInstructorData,
   getInstructors,
   addNewInstructor,
   deleteInstructorById,
   getContact,
   addContact,
   getClassesById,
};
