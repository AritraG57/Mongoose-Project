const favourite = require("../models/favourites");
const home = require("../models/Home");

exports.homeList = (req, res, next) => {
  home
    .find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Index",
        currentPage: "index",
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
      });
    })
    .catch((err) => {
      console.log("Error occured during getHomeDetails");
      res.redirect("/");
    });
};

exports.getAddToFavourites = (req, res, next) => {
  
  favourite
    .find().populate("homeId")
    .then((favourites) => {
      const favouriteHomes = favourites.map(fav => fav.homeId);
      res.render("store/favourites", {
          registeredHomes: favouriteHomes,
          pageTitle: "Favourites",
          currentPage: "favourites",
        });


      
      })
    .catch(err => {
      console.log("Error occurred during getAddToFavourites", err);
    });
};


exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.id;
  favourite.findOne({homeId : homeId}).then((existingFav) => {
    if(existingFav) {
      return res.redirect('/favourites');
    }
    else {
      const fav = new favourite({homeId : homeId});
      return fav.save();
    }
  }).then(()=> {
    res.redirect('/favourites');
  }).catch((err)=> {
    console.log("Error occured during postAddToFavourites");
  })
};

exports.postDeleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  favourite.findOneAndDelete({homeId : homeId}).then(()=> {
    res.redirect("/favourites");
  }).catch((err)=> {
    console.log("Error occured in postDeleteFavourites");
  })
};
