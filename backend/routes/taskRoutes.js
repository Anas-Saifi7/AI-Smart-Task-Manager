const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
   getUserTasks
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/user/:userId", getUserTasks);

module.exports = router;