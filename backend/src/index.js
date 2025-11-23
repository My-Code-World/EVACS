const express = require('express');
const uploadRoute = require('./routes/upload');
const verifyRoute = require('./routes/verify');

require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/upload', uploadRoute);
app.get('/', (req, res) => res.send("Backend running"));
app.use('/verify', verifyRoute);

app.listen(3001, () => console.log('Backend running on port 3001'));
