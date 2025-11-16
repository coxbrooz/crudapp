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

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err) {
            console.log('❌ Error fetching students:', err);
            return res.json("Error");
        }
        console.log('📊 DEBUG - Sending students to frontend:', data);
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    console.log('➕ DEBUG - Creating student with data:', req.body);
    
    const sql = "INSERT INTO student (`Name`, `Email`, `Age`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age
    ]
    
    console.log('📝 DEBUG - Inserting values:', values);
    
    db.query(sql, [values], (err, data) => {
        if(err) {
            console.log('❌ DEBUG - Error creating student:', err);
            return res.json("Error");
        }
        console.log('✅ DEBUG - Student created successfully');
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    console.log('🔄 DEBUG - Updating student ID:', req.params.id, 'with data:', req.body);
    
    const sql = "UPDATE student set `Name` = ?, `Email` = ?, `Age` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age
    ]
    const id = req.params.id;
    
    console.log('📝 DEBUG - Updating with values:', [...values, id]);
    
    db.query(sql, [...values, id], (err, data) => {
        if(err) {
            console.log('❌ DEBUG - Error updating student:', err);
            return res.json("Error");
        }
        console.log('✅ DEBUG - Student updated successfully');
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

// Simple login endpoint for demo purposes
// In production replace with proper hashed passwords and JWTs
app.post('/login', (req, res) => {
    console.log('🔐 DEBUG - Login attempt:', req.body);
    const { email, password } = req.body;

    // Example hardcoded user - change as needed
    const demoUser = {
        email: 'admin@example.com',
        password: 'password123',
        id: 1,
        name: 'Admin'
    }

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    if (email === demoUser.email && password === demoUser.password) {
        // Return a simple token (not a real JWT) for the demo
        const token = 'demo-token-' + Date.now();
        console.log('✅ DEBUG - Login successful for', email);
        return res.json({ success: true, token, user: { id: demoUser.id, name: demoUser.name, email: demoUser.email } });
    }

    console.log('❌ DEBUG - Invalid credentials for', email);
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
})

app.listen(8081, () => {
    console.log("🚀 Server listening on port 8081");
})