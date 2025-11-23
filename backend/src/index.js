const express = require('express');
const uploadRoute = require('./routes/upload');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/upload', uploadRoute);

app.listen(3001, () => console.log('Backend running on port 3001'));
