const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
},
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema)