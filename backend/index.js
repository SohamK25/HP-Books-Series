import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sksql@123',
    database: 'test'
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('this is backend for MySQL CRUD');
})

app.get('/books', (req, res) => {
    const q= 'SELECT * FROM books';
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/books', (req,res) => {
    const q = 'INSERT INTO books (`title`,`desc`,`price`, `cover`) VALUES (?,?,?,?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, values, (err, data) =>{
        if(err) return res.json(err);
        return res.json("Book is added");
    })
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?';
    db.query(q, id, (err, data) =>{
        if(err) return res.json(err);
        return res.json('Book is deleted');
    }
    )
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const q = 'UPDATE books SET title = ?, `desc` = ?, price = ?, cover = ? WHERE id = ?';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values,id], (err, data) =>{
        if(err) return res.json(err);
        return res.json('Book is updated');
    }
    );
});

app.listen(8081, () => {
    console.log('Connected to backend server');
});