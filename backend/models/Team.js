const mongoose =  require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: String,
    },
  ],
});
module.exports = mongoose.model("Team", teamSchema);