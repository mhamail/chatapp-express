const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB, {
    });
    console.log("Connection db successful");
  } catch (error) {
    console.error("DB error:", error);
  }
}

connectToDatabase();