exports.getLogin = (req,res,next)=> {
    console.log("I get response");
    res.render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn : req.isLoggedIn,
      });
};


exports.postLogin = (req,res,next)=> {
    console.log("login post request handled");
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postLogout = (req,res,next) => {
    req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getSignin =(req,res,next)=> {
    res.render("auth/signin", {
        pageTitle: "sign in",
        currentPage: "signin",
        isLoggedIn : req.isLoggedIn,
      });
}