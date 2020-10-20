const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 5000;  // the port doesn't necessarily matter, as long as it isn't 3000 because react is using 3000

require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; // this is the MongoDB Atlas url we'll be putting in a dotenv file
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', _ => console.log('Successfully connected to MongoDB database'))
    .catch(err => console.log(err));

/*
const router = require('./routes')
app.use('/api/___', router)

once we've established our routes we can access them by typing '/api/___/whateverroute' after the www._____.com
*/
app.listen(port, _ => console.log(`Server running on ${port}`));