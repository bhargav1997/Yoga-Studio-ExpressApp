const express = require("express");
const router = express.Router(); // Create Router object
const model = require("./func");

// Convert form data from query string format to JSON format
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Set up Admin page routes
router.get("/", async (request, response) => {
   response.render("addClass", { title: "Admin Page" });
});

// Create page and form processing path
router.get("/add-class", async (request, response) => {
   response.render("addClass", { title: "Add Class" });
});

router.post("/add-class/submit", async (request, response) => {
   // For POST forms, data gets submitted in the body (request.body) and you can get each field's data using request.body.<field_name>
   if (request.body) {
      let newClass = {
         type: request.body?.type,
         date: request.body?.date,
         time: request.body?.time,
         description: request.body?.description,
         level: request.body?.level,
         instructor: request.body?.instructor,
      };

      // console.log("newClass--add-class", newClass);
      // Insert newClass into database
      await model.addNewClass(newClass);

      // Redirect back to home page
      response.render("addClass"); // Redirect back to home page
   }
});

router.get("/add-instructor", async (request, response) => {
   response.render("addInstructor", { title: "Add Instructor" });
});

router.post("/add-instructor/submit", async (request, response) => {
   if (request.body) {
      let newInstructor = {
         name: request.body?.name,
         bio: request.body?.bio,
         imageUrl: request.body?.imageUrl,
      };
      await model.addNewInstructor(newInstructor);

      response.render("addInstructor", { title: "View Instructor", successMessage: "Instructor successfully added!" });
   } else {
      response.render("addInstructor", { title: "Add Instructor", errorMessage: "Failed to add Instructor." });
   }
});

// Delete form submission path
router.get("/delete-class:id", async (request, response) => {
   await model.deleteClassById(request.query.id);
   response.render("/");
});

// View contacts
router.get("/view-contact", async (request, response) => {
   let contacts = await model.getContact();
   response.render("viewContact", { title: "View Contact", contacts: contacts && contacts.length > 0 ? contacts : [] });
});

module.exports = router;
