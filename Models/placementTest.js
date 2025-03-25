const mongoose = require("mongoose");

const InboxTestSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  google_workspace_emails_count: { type: Number, default: 0 },
  microsoft_professional_emails_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InboxTest", InboxTestSchema);
