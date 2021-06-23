require("dotenv").config()
const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const session = require("express-session")

const User = require("./models/user")



app.use(express.static(path.join(__dirname, "public")))
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//Session
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized:true,
  }))

// EJS
app.set("view engine", "ejs")




//db mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userFindAndModify: false,
})
.then(() => console.log("connect"))
.catch((err) => console.log(err));
//register get

app.get("/",(req,res)=>{
    res.render("register.ejs")
    
})

// app.get("/", (req, res) => {
//     res.send("./register.ejs")
// })

//register post
app.post("/signup" , async(req,res) => {
    try {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
        await user.save();
        res.redirect("/login")
        console.log("user created")
      } catch{
        res.redirect("/")
      }
    })

    //login get
    app.get("/login", (req,res) => {
        res.render("register.ejs")
      })

    
 
    //LOGIN POST
    app.post("/signin", async (req,res) => {
    await User.find({ email:  req.body.email }).then(data => {
      if(req.body.password == data[0].password){
        req.session.user = data[0]
        res.redirect("/index")
      }
    }).catch(e => {
      console.log(e)
      res.send("Error")
    })
  
   
   })
    
  //  app.get("/register",(req,res) =>{
  //    res.render("register.ejs")
  //  })
  app.get("/index",(req,res) =>{
    res.render("index.ejs")
  })

  let port = process.env.PORT || 3000



app.listen(3000, () => {
    console.log("listening on port 3000")
})





// require("dotenv").config()
// const express = require('express')
// const app = express()
// const path = require('path')
// const logger = require('morgan')
// const mongoose = require('mongoose')
// const session = require("express-session")
// const User = require("./models/user")
// // const { Console } = require("console")


// app.use(express.static(path.join(__dirname, "public")))
// app.use(logger("dev"))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

// //SESSION
// app.use(session({
//   secret: process.env.SECRET,
//   resave: true,
//   saveUninitialized:true,
// }))

// // EJS
// app.set("view-engine","ejs")
// // DB MONGOOSE
// console.log(process.env.MONGO_URL);
// mongoose
//     .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     userFindAndModify: false,
// }).then(() => console.log("connect"))
//   .catch((err) => console.log(err));
// // REGISTER GET

// app.get("/",(req,res) =>{
//   res.render("register.ejs")
// })
// // REGISTER POST
// app.post("/signup",async (req,res) => {
//   console.log(req.body)
//   try {
//     await User.find({ email:  req.body.email }).then( async data => {
//       if(data[0]){
//         req.session.user = data[0]
//         res.redirect("/register")
//       }else{
//         const user = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//         })
//         await user.save();
//         console.log("User created")
//         res.redirect("/register")

//       }
//     }).catch(e => {
//       console.log(e)
//       res.send("Error")
//     })
  
   
//   } catch{
//     res.redirect("/")
//   }
// })

// //LOGIN GET
// app.get("/login", (req,res) => {
//   res.render("login.ejs")
// })
 
// //LOGIN POST
// app.post("/signin", async (req,res) => {
//  console.log(req.body)
//   await User.find({ email:  req.body.email }).then(data => {
//     console.log(data)
//     if(req.body.password == data[0].password){
//       console.log(req.body.password)
//       req.session.user = data[0]
//       res.redirect("/index")
//     }
//   }).catch(e => {
//     console.log(e)
//     res.send("Error")
//   })

 
//  })
  
 app.get("/index",(req,res) =>{
   res.render("index.ejs")
 })




// app.listen(3000, () => {
//     console.log("listening on port 3000")
// })