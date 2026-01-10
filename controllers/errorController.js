exports.errorController = (req, res, next) => {
  res.render("error404", { pageTitle: "Error" });
};
