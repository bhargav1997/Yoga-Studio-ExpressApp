const express = require("express");
const router = express.Router(); // Create Router object
const model = require("./func");

// Convert form data from query string format to JSON format
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Set up page routes

router.get("/", async (request, response) => {
   try {
      let classes = await model.getClasses();

      if (classes.length === 0) {
         await model.initializeClasses();
         classes = await model.getClasses();
      }

      // console.log("classesData--Home", classes);

      response.render("index", { title: "Online Yoga Studio Classes", classes: [...classes] });
   } catch (err) {
      console.error(err);
      response.status(500).send("Error fetching classes");
   }
});

router.get("/instructors", async (req, res) => {
   try {
      let instructorsData = await model.getInstructors();

      if (instructorsData.length === 0) {
         await model.initializeInstructorData();

         instructorsData = await model.getInstructors();
      }

      res.render("instructors", { title: "Meet Our Instructors", instructors: instructorsData });
   } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching instructors");
   }
});

router.get("/classes", async (req, res) => {
   try {
      let classesData = await model.getClasses();
      if (classesData.length === 0) {
         await model.initializeClasses();

         // Re-fetch the data after insertion
         classesData = await model.getClasses();
      }

      // console.log("classesData--classes", classesData);
      res.render("classes", { title: "Online Yoga Studio Classes", classes: classesData });
   } catch (err) {
      console.error("Error fetching classes: ", err); // More detailed error logging
      res.status(500).send("Error fetching classes");
   }
});

router.get("/classes/:id", async (req, res) => {
   const id = req.params.id;

   try {
      // Fetch data from database
      const classesData = await model.getClassesById(id);

      // console.log("classesData--viewClass", classesData);

      if (classesData && classesData.length > 0) {
         // Render view with class data
         return res.render("viewClass", { title: "Class Details", classData: classesData[0] });
      }

      // Render view if no class data found
      res.render("viewClass", { title: "View Class", classData: {} });
   } catch (error) {
      console.error("Error fetching class data:", error);
      res.status(500).send("Internal Server Error");
   }
});

router.get("/contact", (req, res) => {
   res.render("contact");
});

router.post("/contact/submit", async (req, res) => {
   if (req.body) {
      let newContact = {
         name: req.body?.name,
         email: req.body?.email,
         message: req.body?.message,
      };
      await model.addContact(newContact);

      // Pass a success message to the template
      return res.render("contact", { title: "Add Contact", successMessage: "Contact successfully added!" });
   }

   // In case of failure, you can handle it accordingly
   res.render("contact", { title: "Add Contact", errorMessage: "Failed to add contact." });
});

module.exports = router;
