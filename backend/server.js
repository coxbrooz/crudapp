const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "crud-db"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`, `Age`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student set `Name` = ?, `Email` = ?, `Age` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age
    ]
    const id = req.params.id;
    
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Server listening on port 8081");
})