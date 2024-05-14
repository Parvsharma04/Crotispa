// // app.js
// const bodyParser = require('body-parser')
// const express = require('express')
// const {MongoClient} = require('mongodb')

// const app = express()
// const port = 3000
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// const url = 'mongodb+srv://priyanshugupta2193:12341234@cluster0.hboohgw.mongodb.net/'
// const client = new MongoClient(url)
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())



// app.get('/', async (_req, res)=>{
//     try {
//         await client.connect()
//         const db = client.db('Crotispa')
//         const collection = db.collection('CrotispaCollection')
//         const data = collection.find({}).toArray()
//         res.json(data)
//     } catch (error) {
//         res.send(error)
//     }
// })


// app.get('/register', (_req, res)=>{
//     res.sendFile('/signup.html',{root:'../templates'})
// })


// app.post('/register', async(req, res)=>{
//     await client.connect()
//         const db = client.db('Crotispa')
//         const collection = db.collection('CrotispaCollection')
//         const response = await collection.insertOne(req.body);
//         console.log(response)
//         client.close()
//         res.redirect('/login')
// })

// app.get('/login', (_req, res)=>{
//     res.sendFile('/login.html', {root: '../templates'})
// })

// // const count = await collection.countDocuments({
// //     username: req.body.username,
// //     password: req.body.password
// //   });
  
// //   if (count > 0) {
// //     res.send('Logged in Successfully');
// //   } else {
// //     res.redirect('/register');
// //   }

// app.post('/login', async(req, res)=>{
//     await client.connect()
//         const db = client.db('Crotispa')
//         const collection = db.collection('CrotispaCollection')
//     if(collection.find( {$and : [{username: req.body.username}, {password: req.body.password}]})){
//         res.send('logged in Successfully')
//     }
//     else{
//         res.redirect('/register')
//     }
// })

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://priyanshugupta2193:12341234@cluster0.hboohgw.mongodb.net/Crotispa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {collection: "CrotispaCollection"});

// Create a user model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    // Render the home page
    res.sendFile(path.join(__dirname, 'backend', 'frontend', 'home.html'));
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

// Signup route
app.post('/register', async (req, res) => {
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