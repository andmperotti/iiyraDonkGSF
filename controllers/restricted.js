module.exports = {
  getRestricted: async (req, res) => {
    try {
      res.render("restricted.ejs");
    } catch (err) {
      console.log(err);
    }
  },
};
