const mongoose = require("mongoose");
const User = require("../models/User.js");
const Team = require("../models/Team.js");
const Invitation = require("../models/Invitation.js");

// 📩 SEND INVITE
const sendInvite = async (req, res) => {
  try {
    const { email, role, teamId, senderId } = req.body;

    // ✅ VALIDATION
    if (!email || !role || !teamId || !senderId) {
      return res.status(400).json({ msg: "All fields required ❌" });
    }

    // ✅ ObjectId check
    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(senderId)
    ) {
      return res.status(400).json({ msg: "Invalid IDs ❌" });
    }

    // ✅ find receiver
    const receiver = await User.findOne({ email });
    if (!receiver) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    // ✅ check team exist
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: "Team not found ❌" });
    }

    // ✅ already invited?
    const existing = await Invitation.findOne({
      receiver: receiver._id,
      team: teamId,
      status: "Pending",
    });

    if (existing) {
      return res.status(400).json({ msg: "Already invited ⚠️" });
    }

    // ✅ create invite
    const invite = await Invitation.create({
      sender: senderId,
      receiver: receiver._id,
      team: teamId,
      role,
    });

    res.json({
      msg: "Invitation sent ✅",
      receiverId: receiver._id,
      invite,
    });

  } catch (err) {
    console.error("SEND INVITE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// ✅ ACCEPT INVITE
const acceptInvite = async (req, res) => {
  try {
    const invite = await Invitation.findById(req.params.id);

    if (!invite) {
      return res.status(404).json({ msg: "Invite not found ❌" });
    }

    invite.status = "Accepted";
    await invite.save();

    await Team.findByIdAndUpdate(invite.team, {
      $push: {
        members: {
          user: invite.receiver,
          role: invite.role,
        },
      },
    });

    // ✅ Ensure the accepting user points to this team
    await User.findByIdAndUpdate(invite.receiver, {
      $set: { teamId: invite.team },
    });

    res.json({ msg: "Joined team 🎉" });

  } catch (err) {
    console.error("ACCEPT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// ❌ REJECT INVITE
const rejectInvite = async (req, res) => {
  try {
    const invite = await Invitation.findById(req.params.id);

    if (!invite) {
      return res.status(404).json({ msg: "Invite not found ❌" });
    }

    invite.status = "Rejected";
    await invite.save();

    res.json({ msg: "Invite rejected ❌" });

  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// 📥 GET REQUESTS
const getRequests = async (req, res) => {
  try {
    const invites = await Invitation.find({
      receiver: req.params.userId,
      status: "Pending",
    }).populate("sender");

    res.json(invites);

  } catch (err) {
    console.error("REQUEST ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// 👥 GET TEAM MEMBERS
const getTeamMembers = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
      .populate("members.user");

    if (!team) {
      return res.status(404).json({ msg: "Team not found ❌" });
    }

    res.json(team.members);

  } catch (err) {
    console.error("TEAM ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  sendInvite,
  acceptInvite,
  rejectInvite,
  getRequests,
  getTeamMembers,
};
