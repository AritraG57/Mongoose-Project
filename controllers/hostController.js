//importing the modules

const Home = require("../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing : false,
    isLoggedIn : req.session.isLoggedIn,
    user : req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home({
    image : req.body.image,
    homename : req.body.homename,
    rating : req.body.rating,
    price : req.body.price,
    description : req.body.description}
  );

  home.save().then(()=> {
    res.render("host/home-added", {
    pageTitle: "Home Added",
    currentPage: "home-added",
    isLoggedIn : req.session.isLoggedIn,
    user : req.session.user,
    
  });
  }).catch((err)=> {
    console.log("Error Occured during postAddHome");
  });
  
};

exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.find().then((registeredHomes )=> {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes",
      currentPage: "host-homes",
      isLoggedIn : req.session.isLoggedIn,
      user : req.session.user,
    });
  }).catch((err)=> {
    console.log("Error occured during getHostHomes");
  });
};

exports.hostGetEditHomes = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home)=> {
    
  res.render("host/edit-home", {
    home : home,
    editing : editing,
    pageTitle: "Add Home",
    currentPage: "add-home",
    isLoggedIn : req.session.isLoggedIn,
    user : req.session.user,
  });
}
).catch((err)=> {
  console.log("Error occured during hostGetEditHomes");
})
  
  
};

exports.postEditHomes = (req,res,next) => {
  Home.findById(req.body._id).then((updatedHome)=> {
    updatedHome.homename = req.body.homename;
    updatedHome.price = req.body.price;
    updatedHome.rating = req.body.rating;
    updatedHome.image = req.body.image;
    updatedHome.description = req.body.description;
    updatedHome.save().then((result)=> {
      console.log("Home Updated");
    }).catch((err)=> {
      console.log("Error occured wile updating the home");
    });
    res.redirect("/host/host-homes");
  })
  .catch((err)=> {
    console.log("Error Ocuured during postEditHomes");
  });
  
};

exports.postDeleteHome = (req,res,next)=> {
  const homeId = req.params.homeId;
  // console.log(homeId);
  Home.findByIdAndDelete(homeId).then(()=> {
    res.redirect('/host/host-homes');
  }).catch((err)=> {
    console.log("Error occured during postDeleteHome",err);
  });
  
}
