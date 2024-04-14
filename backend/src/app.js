// app.js
const bodyParser = require('body-parser')
const express = require('express')
const {MongoClient} = require('mongodb')

const app = express()
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



const url = 'mongodb+srv://priyanshugupta2193:12341234@cluster0.hboohgw.mongodb.net/'
const client = new MongoClient(url)
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.get('/', async (_req, res)=>{
    try {
        await client.connect()
        const db = client.db('Crotispa')
        const collection = db.collection('CrotispaCollection')
        const data = collection.find({}).toArray()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})


app.get('/register', (_req, res)=>{
    res.sendFile('/signup.html',{root:'../templates'})
})


app.post('/register', async(req, res)=>{
    await client.connect()
        const db = client.db('Crotispa')
        const collection = db.collection('CrotispaCollection')
        const response = await collection.insertOne(req.body);
        console.log(response)
        client.close()
        res.redirect('/login')
})

app.get('/login', (_req, res)=>{
    res.sendFile('/login.html', {root: '../templates'})
})

// const count = await collection.countDocuments({
//     username: req.body.username,
//     password: req.body.password
//   });
  
//   if (count > 0) {
//     res.send('Logged in Successfully');
//   } else {
//     res.redirect('/register');
//   }

app.post('/login', async(req, res)=>{
    await client.connect()
        const db = client.db('Crotispa')
        const collection = db.collection('CrotispaCollection')
    if(collection.find( {$and : [{username: req.body.username}, {password: req.body.password}]})){
        res.send('logged in Successfully')
    }
    else{
        res.redirect('/register')
    }
})