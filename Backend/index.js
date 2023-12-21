import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import clotheRoutes from './routes/clotheRoutes.js'
import cors from 'cors';
import bodyParser from "body-parser";
import LocalStrategy from "passport-local"
import passportLocalMongoose from "passport-local-mongoose";
import { wishList } from './models/wishList.js'
const passport = require("passport")
const User = require("./models/User.cjs");

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }),
    bodyParser.json()
);

app.use('/clothing', clotheRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });  



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: true
}));
 
app.use(passport.initialize());
app.use(passport.session());


 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
app.use((req, res, next) => {
  res.locals.userInfo = req.session.userInfo;
  next();
});
//=====================
// ROUTES
//===================== 
let userInfo = ''

app.get("/", function (req, res) {
    res.render("home");
});
 
app.get('/wishlist', async (request, response) => {
    try{
        
        const wishItems = await wishList.find({'userName': userInfo.user});
        const itemsList = wishItems[0].itemsList;
        const itemId = wishItems[0]._id
        
        return response.status(200).json({
            itemsList, itemId
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

app.post("/wishlist", async function(req, res){
    
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
 
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});
 
// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
   
    const wishItem = await wishList.create({
        userId: req.body._id,
        userName: req.body.username,
        itemsList: {}
      });

    return res.status(200).json(user);
  });

app.put("/wishlist", async (request, response) => {
    try {
        // let wishItemm = await wishList.updateOne(
        //     {"userName": "test15"},
        //     { "itemsList": request.body.newItem }
        // );
        
        console.log(request.body)
        const result = await wishList.findOneAndUpdate(
            {"userName":userInfo.user}, 
            { $push: { itemsList: request.body.itemsList } },
            { new: true }
            )
        console.log(req.session.userInfo.user)
        console.log(request.body.userName)
        
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});
 
app.delete("/wishlist", async (request, response) => {
    try{
        const { id } = request.params;

        const wishes = await wishList.find({});
        const result = await wishList.findOneAndDelete({"item": request.body.item})
        console.log(wishes)

        console.log(request.body.item)

        if (!result) {
            return response.status(404).json({message: `Item not found ${wishes}`})
        }

        return response.status(200).send({ message: `Item deleted successfuly ${wishes}` })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

app.delete("/wishlist/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      // Assuming id is the _id of the wishlist document
      const result = await wishList.findOneAndUpdate(
        { _id: id },
        { $pull: { itemsList: { item: request.body.item } } },
        { new: true }
      );
  
      if (!result) {
        return response.status(404).json({ message: "Item not found" });
      }
  
      return response.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

app.get('/users', async (req, res) => {
    try{
        const items = await User.find({});
        return res.status(200).json({
            "userInfo": userInfo
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
    }
})
 
app.get('/login', function(req, res) {
    res.render("login");
})

//Handling user login
app.post("/login", async function(req, res){
  try {
      // check if the user exists
      if (req.body.username === 'logout') {
          // Handle logout
          userInfo = ''
          req.session.destroy(() => {
              const redirectUrl = 'http://localhost:5173/';
              res.redirect(redirectUrl);
          });
          return; // End the request after redirect
      }

      const user = await User.findOne({ username: req.body.username });
      
      if (!user) {
          res.status(400).json({ error: "User doesn't exist" });
          return; // End the request after sending the error response
      }

      // Check if password matches
      const result = req.body.password === user.password;
      if (!result) {
          res.status(400).json({ error: "Password doesn't match" });
          return; // End the request after sending the error response
      }

      // If password matches
      userInfo = {'user': user.username, 'id': user._id};
      req.session.userInfo = {
          'user': user.username,
          'id': user._id,
      };
      const redirectUrl = 'http://localhost:5173/';
      res.redirect(redirectUrl);
  } catch (error) {
      res.status(400).json({ error });
  }
});

//Handling user logout 
app.get('/logout', function(req, res, next){
  req.session.destroy(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

 
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
    
}