const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://xenonstack-fullstack.vercel.app'], // Add any other origins you need
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the HTTP methods you want to allow
    credentials: true
}));


mongoose.connect("mongodb+srv://vanshnarang49906:1234VANSH@cluster0.mugvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));

app.get("/", (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
