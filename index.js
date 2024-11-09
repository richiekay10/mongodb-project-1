const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/api');  // MongoDB connection string
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Call the async function to connect to MongoDB
connectToMongo();

// Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedYear: Number,
});
const Book = mongoose.model('Book', bookSchema);

// GET Route to Retrieve All Books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();  // Retrieve all books from MongoDB
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Route to Retrieve One Book by Author
app.get('/book/:author', async (req, res) => {
  const { author } = req.params;  // Get the author from the URL parameter
  try {
    const book = await Book.findOne({ author });  // Find a single book by author
    if (!book) {
      return res.status(404).json({ message: `No book found by author: ${author}` });
    }
    res.status(200).json(book);  // Return the book if found
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
