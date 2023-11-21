https://chat.openai.com/share/3ffa699f-8acc-4705-b1c5-e3c5c0959254


const express = require('express');
const mongoose = require('mongoose');
const { User, Conversation, Message } = require('./models'); // Assuming your models are in a file called 'models.js'

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Express middleware to parse JSON requests
app.use(express.json());

// Route to create a conversation and messages between two users
app.post('/createConversation', async (req, res) => {
  try {
    // Assuming you have user IDs for two users (user1Id and user2Id)
    const { user1Id, user2Id } = req.body;

    // Create a conversation
    const newConversation = new Conversation({
      participants: [user1Id, user2Id],
    });

    const savedConversation = await newConversation.save();

    // Create messages for the conversation
    const message1 = new Message({
      user: user1Id,
      conversation: savedConversation._id,
      content: 'Hello, how are you?',
    });

    const message2 = new Message({
      user: user2Id,
      conversation: savedConversation._id,
      content: 'Hi! I'm doing well. How about you?',
    });

    // Save the messages
    await message1.save();
    await message2.save();

    res.status(201).json({ conversation: savedConversation, messages: [message1, message2] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
