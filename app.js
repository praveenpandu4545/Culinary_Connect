const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path'); 
const cors = require('cors');
const signuproutes = require('./roots/signup_roots');

const app = express(); 
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost:27017/sports1')
    .then(() => {
        console.log("Database connected");
        app.listen(3000, () => { 
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });


app.use('/signinon', signuproutes);


app.get('/', (req, res) => {
    res.send("Welcome to the Signup Page!");
});
