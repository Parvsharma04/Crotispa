// const express = require("express")
// const path = require("path")
// const app = express()
// // const hbs = require("hbs")
// const LogInCollection = require("./mongodb")
// const port = process.env.PORT || 3000
// app.use(express.json())

// app.use(express.urlencoded({ extended: false }))

// const templatePath = path.join(__dirname, '../templates')
// const publicPath = path.join(__dirname, '../public')
// console.log(publicPath);

// app.set('view engine', 'hbs')
// app.set('views', templatePath)
// app.use(express.static(publicPath))


// // hbs.registerPartials(partialPath)


// app.get('http://127.0.0.1:5500/NewFolder/templates/signup.html', (req, res) => {
//     res.render('signup')
// })
// app.get('http://127.0.0.1:5500/NewFolder/templates/login.html', (req, res) => {
//     res.render('login')
// })


// app.get('/home', (req, res) => {
//   res.sendFile(path.join(__dirname, '../PRO/home.html'));
// });


// // app.get('/home', (req, res) => {
// //     res.render('home')
// // })

// app.post('/signup', async (req, res) => {
//   const data = {
//     name: req.body.name,
//     password: req.body.password
//   };
//   const checking = await LogInCollection.findOne({ name: req.body.name });
//   if (checking && checking.name === req.body.name && checking.password === req.body.password) {
//     res.send("user details already exist");
//   } else {
//     try {
//       await LogInCollection.insertMany([data]);
//       res.redirect('/home');
//     } catch (error) {
//       res.send("wrong inputs");
//     }
//   }
// });


// app.post('http://127.0.0.1:5500/NewFolder/templates/login.html', async (req, res) => {

//     try {
//         const check = await LogInCollection.findOne({ name: req.body.name })

//         if (check.password === req.body.password) {
//             res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
//         }

//         else {
//             res.send("incorrect password")
//         }


//     } 
    
//     catch (e) {

//         res.send("wrong details")
        

//     }


// })



// app.listen(port, () => {
//     console.log('port connected');
// })





// const express = require("express");
// const path = require("path");
// const app = express();
// const LogInCollection = require("./mongodb");
// const port = process.env.PORT || 3000;

// app.use(express.static('public'))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// const templatePath = path.join(__dirname, "../backend/templates");
// const publicPath = path.join(__dirname, "../backend/public");
// const homePath = path.join(__dirname, "../frontend/home.html");

// app.get('/', (req, res)=>{
//   res.send('a')
// })
// console.log(publicPath);
// app.set('view engine', 'hbs');
// app.set('views', templatePath);
// app.use(express.static(publicPath));

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.get('/home', (req, res) => {
//   res.sendFile(homePath);
// });

// app.post('/signup', async (req, res) => {
//   const data = {
//     name: req.body.name,
//     password: req.body.password
//   };
//   const checking = await LogInCollection.findOne({ name: req.body.name });
//   if (checking && checking.name === req.body.name && checking.password === req.body.password) {
//     res.send("user details already exist");
//   } else {
//     try {
//       await LogInCollection.insertMany([data]);
//       res.redirect('/home');
//     } catch (error) {
//       res.send("wrong inputs");
//     }
//   }
// });

// app.post('/login', async (req, res) => {
//   try {
//     const check = await LogInCollection.findOne({ name: req.body.name });
//     if (check && check.password === req.body.password) {
//       res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
//     } else {
//       res.send("incorrect password");
//     }
//   } catch (e) {
//     res.send("wrong details");
//   }
// });

// app.listen(port, () => {
//   console.log('port connected');
// });


const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongodb");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../backend/templates");
const publicPath = path.join(__dirname, "../backend/public");
const homePath = path.join(__dirname, "../frontend/home.html");

console.log(publicPath);
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.sendFile(homePath);
});

app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  };
  const checking = await LogInCollection.findOne({ name: req.body.name });
  if (checking && checking.name === req.body.name && checking.password === req.body.password) {
    res.send("user details already exist");
  } else {
    try {
      await LogInCollection.insertMany([data]);
      res.redirect('/home');
    } catch (error) {
      res.send("wrong inputs");
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
    } else {
      res.send("incorrect password");
    }
  } catch (e) {
    res.send("wrong details");
  }
});

app.listen(port, () => {
  console.log('port connected');
});