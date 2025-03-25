const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    subject: { type: String },
    message: { type: String, required: true },
    sender_email_id: { type: Number, required: true },
    content_type: { type: String, enum: ['html', 'text'], required: true },
    to_emails: [{ name: String, email_address: String }],
    cc_emails: [{ name: String, email_address: String }],
    bcc_emails: [{ name: String, email_address: String }],
    sent_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', EmailSchema);
