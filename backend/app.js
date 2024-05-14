const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://priyanshugupta2193:12341234@cluster0.hboohgw.mongodb.net/Crotispa').then(res=>console.log('Db Connected'))

// Create a user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {collection: "CrotispaCollection"});

// Create a user model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Login route

// app.get('/', (req, res) => {
//   r
// })

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})

app.post('/login', async (req, res) => {
  try {
    const user = await User.find({username:req.body.username, password:req.body.password});

    if (user) {
      res.status(401).send('done');
    }
    else{ 
      res.send('invalid')
    }

    // Render the home page
    res.sendFile(path.join(__dirname, 'backend', 'frontend', 'home.html'));
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();

    // Render the home page
    res.sendFile(path.join(__dirname, 'backend', 'frontend', 'home.html'));
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});