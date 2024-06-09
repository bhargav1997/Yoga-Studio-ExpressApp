const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const db = require("./modules/db"); //load db.js

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//  Homepage Route
app.get("/", async (req, res) => {
   try {
      // Fetch all yoga classes from the database
      const classes = await Class.find().populate("instructorId"); // Populate instructor details

      res.render("index", { classes }); // Render the index.pug template with classes data
   } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching classes");
   }
});

//  Instructors Route (Optional) (add if you want a dedicated instructors page)
app.get("/instructors", async (req, res) => {
   try {
      // Fetch all instructors from the database
      const instructors = await Instructor.find();

      res.render("instructors", { instructors }); // Render the instructors.pug template with instructors data
   } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching instructors");
   }
});

//  Update Movie Rating Route (replace with updateRating)
app.get("/movies/updateRating", async (req, res) => {
   // Replace this code with your logic for updating movie rating using your database functions
   res.send("Update Movie Rating route not implemented yet!");
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Internal Server Error");
});

//set up server listening
app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`);
});
