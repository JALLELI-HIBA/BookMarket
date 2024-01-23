import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'

const app = express();



app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'market'
});


db.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('db connected!');
    }
});



app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
});

app.post('/books', (req, res) => {
    const { title, desc, cover } = req.body;

    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)";
    const values = [title, desc, cover];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    
        console.log('Record inserted successfully');
        return res.status(201).json(result);
    });
});

app.put("/books/update/:id", (req, res) => {
    const bookId = req.params.id;
    const { title, desc, cover } = req.body;
    const q = "UPDATE books SET title=?, `desc`=?, cover=? WHERE id=?";
    const values = [title, desc, cover, bookId];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
 
app.delete("/books/delete/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id=?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/books/search/:query', (req, res) => {
    const searchQuery = req.params.query;
    const q = 'SELECT * FROM books WHERE title LIKE ? OR `desc` LIKE ?';
    const values = [`%${searchQuery}%`, `%${searchQuery}%`];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        return res.status(200).json(data);
    });
});



app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
