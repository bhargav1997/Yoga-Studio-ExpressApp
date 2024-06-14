const mongoose = require("mongoose");

// Sample Instructor Data
const instructorsSampleData = [
   {
      _id: new mongoose.Types.ObjectId(),
      name: "Alice Johnson",
      bio: "Alice is a certified yoga instructor with over 10 years of experience.",
      imageUrl:
         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      _id: new mongoose.Types.ObjectId(),
      name: "Bob Smith",
      bio: "Bob specializes in Vinyasa and Hatha yoga, bringing a modern twist to classic techniques.",
      imageUrl:
         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      _id: new mongoose.Types.ObjectId(),
      name: "Charlie Brown",
      bio: "Charlie has a deep understanding of yoga anatomy and focuses on therapeutic yoga.",
      imageUrl:
         "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
];

// Sample Class Data
const classesSampleData = [
   {
      type: "Vinyasa",
      date: new Date("2024-07-01"),
      time: "10:00 AM",
      description: "A dynamic flow class that synchronizes movement with breath.",
      level: "Intermediate",
   },
   {
      type: "Hatha",
      date: new Date("2024-07-02"),
      time: "12:00 PM",
      description: "A traditional yoga class focusing on postures and breathing techniques.",
      level: "Beginner",
   },
   {
      type: "Restorative",
      date: new Date("2024-07-03"),
      time: "6:00 PM",
      description: "A relaxing class designed to restore and rejuvenate the body.",
      level: "Advanced",
   },
];

module.exports = { instructorsSampleData, classesSampleData };
