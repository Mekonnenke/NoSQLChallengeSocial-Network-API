// Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes'));

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NoSQLChallengeSocial-Network-API', {
  useNewUrlParser: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);



app.listen(PORT, () => console.log(` ***** 🌍 Connection on localhost:${PORT} is starting.  ***** \n`));

