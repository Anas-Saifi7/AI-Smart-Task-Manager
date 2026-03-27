const express  =  require('express');
const {
  sendInvite,
  acceptInvite,
  rejectInvite,
  getRequests,
  getTeamMembers,
} =  require("../controllers/teamController.js");

const router = express.Router();

router.post("/invite", sendInvite);
router.post("/accept/:id", acceptInvite);
router.post("/reject/:id", rejectInvite);
router.get("/requests/:userId", getRequests);
router.get("/team/:teamId", getTeamMembers);

module.exports = router;