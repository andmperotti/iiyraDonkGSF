module.exports = {
  seasonWipe: async (req, res) => {
    if (req.user.isAdmin === true) {
      try {
        res.render("seasonWipe.ejs");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/restricted");
    }
  },
};
