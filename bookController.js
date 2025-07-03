const fs = require('fs');
const path = './books.json';

const readData = () => JSON.parse(fs.readFileSync(path));
const writeData = (data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

exports.getBooks = (req, res) => {
  const books = readData();
  res.json(books);
};

exports.getBookById = (req, res) => {
  const books = readData();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
};

exports.addBook = (req, res) => {
  const books = readData();
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeData(books);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  let books = readData();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    writeData(books);
    res.json(books[index]);
  } else res.status(404).json({ message: 'Book not found' });
};

exports.deleteBook = (req, res) => {
  let books = readData();
  const filtered = books.filter(b => b.id !== parseInt(req.params.id));
  if (filtered.length !== books.length) {
    writeData(filtered);
    res.json({ message: 'Book deleted' });
  } else res.status(404).json({ message: 'Book not found' });
};
