const express = require("express");
const bodyParser = require("body-parser");
const port = 3000,
  host = "localhost";

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mock Database
const books = [
  {
    ISBN: "123456789",
    title: "Sample Book",
    author: "John Doe",
    reviews: [],
  },
  // Add more books as needed
];

const users = [];

// General Users Endpoints

// Task 1
app.get("/books", (req, res) => {
  res.json(books);
});

// Task 2
app.get("/books/:isbn", (req, res) => {
  const book = books.find((b) => b.ISBN === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Task 3
app.get("/books/author/:author", (req, res) => {
  const booksByAuthor = books.filter((b) => b.author === req.params.author);
  res.json(booksByAuthor);
});

// Task 4
app.get("/books/title/:title", (req, res) => {
  const booksByTitle = books.filter((b) => b.title === req.params.title);
  res.json(booksByTitle);
});

// Task 5
app.get("/books/:isbn/review", (req, res) => {
  const book = books.find((b) => b.ISBN === req.params.isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Task 6
app.post("/register", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

// Task 7
app.post("/login", (req, res) => {
  // Add logic to handle user login
  const { username, password } = req.body;
  // Implement your authentication logic here
  // For simplicity, assuming all registered users are valid
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Registered Users Endpoints

// Task 8
app.post("/books/:isbn/review", (req, res) => {
  // Add/Modify a book review
  const { isbn } = req.params;
  const { review, username } = req.body;

  const book = books.find((b) => b.ISBN === isbn);
  if (book) {
    // Assuming reviews are stored as simple strings for simplicity
    book.reviews.push({ username, review });
    res.json({ message: "Review added/modified successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Task 9
app.delete("/books/:isbn/review", (req, res) => {
  // Delete book review added by that particular user
  const { isbn } = req.params;
  const { username } = req.body;

  const book = books.find((b) => b.ISBN === isbn);
  if (book) {
    // Assuming reviews are stored as simple strings for simplicity
    book.reviews = book.reviews.filter(
      (review) => review.username !== username
    );
    res.json({ message: "Review deleted successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.listen(host, port, () => {
  console.log(`The server is running on http://${host}:${port}`);
});
