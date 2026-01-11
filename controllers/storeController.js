const favourite = require("../models/favourites");
const home = require("../models/Home");
const User = require('../models/user');

exports.homeList = (req, res, next) => {
  home
    .find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Index",
        currentPage: "index",
        isLoggedIn : req.session.isLoggedIn,
        user : req.session.user,
      });
    })
    .catch((err) => {
      console.log("Error occured during homeList");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  home
    .findById(homeId)
    .then((home) => {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "index",
        isLoggedIn : req.session.isLoggedIn,
        user : req.session.user,
      });
    })
    .catch((err) => {
      console.log("Error occured during getHomeDetails");
      res.redirect("/");
    });
};

exports.getAddToFavourites = (req, res, next) => {
  const userId = req.session.user._id;
  User.findById(userId).populate('favouriteHomes')
    .then((user) => {
      
      res.render("store/favourites", {
          registeredHomes: user.favouriteHomes,
          pageTitle: "Favourites",
          currentPage: "favourites",
          isLoggedIn : req.session.isLoggedIn,
          user : req.session.user,
        });


      
      })
    .catch(err => {
      console.log("Error occurred during getAddToFavourites", err);
    });
};


exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  User.findById(userId).then((user) => {
    if(!user.favouriteHomes.includes(homeId)) {
      user.favouriteHomes.push(homeId);
      return user.save();
    }
    return user;
    
  }).then(()=> {
    res.redirect('/favourites');
  }).catch((err)=> {
    console.log("Error occured during postAddToFavourites");
  })
};

exports.postDeleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  User.findById(userId).then((user)=>{
    user.favouriteHomes = user.favouriteHomes.filter(id => id.toString() !== homeId);
    return user.save();
  }).then(()=> {
    res.redirect("/favourites");
  }).catch((err)=> {
    console.log("Error occured in postDeleteFavourites");
  })
};
