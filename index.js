const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = []; // In-memory array to store books
let currentId = 1; // Simple ID tracker

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to get a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(book => book.id === bookId);

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

// Route to add a new book
app.post('/books', (req, res) => {
  const { title, author, description } = req.body;
  const book = { id: currentId++, title, author, description };
  books.push(book);
  res.status(201).json(book);
});

// Route to update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author, description } = req.body;
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

  books[bookIndex] = { id: bookId, title, author, description };
  res.json(books[bookIndex]);
});

// Route to partially update a book by ID (PATCH)
app.patch('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author, description } = req.body;
  const book = books.find(book => book.id === bookId);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;
  if (description) book.description = description;

  res.json(book);
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
