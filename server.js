const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Define routes
const books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');
    books.splice(bookIndex, 1);
    res.send('Book deleted');
});

const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});