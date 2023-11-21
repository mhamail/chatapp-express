const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const messageSchema = new mongoose.Schema({
    conversation: {
        type: ObjectId,
        ref: 'Conversation'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema)