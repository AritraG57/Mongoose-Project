const { check, validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  console.log("I get response");
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  console.log("login post request handled");
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignin = (req, res, next) => {
  res.render("auth/signin", {
    pageTitle: "sign in",
    currentPage: "signin",
    isLoggedIn: req.isLoggedIn,
    oldInput : {},
    errorMassages : [],
  });
};

exports.postSignin = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name only contain letters"),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Usertype is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and consitions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You mist accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signin", {
        pageTitle: "Sign In",
        currentPage: "signin",
        isLoggedIn: false,
        errorMassages : errors.array().map(error => error.msg),
        oldInput : {
            firstName,
            lastName,
            email,
            password,
            userType,
        }
      });
    }

    res.redirect('/login');
  },
];
