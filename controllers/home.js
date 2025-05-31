module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getResources: (req, res) => {
    res.render("resources.ejs");
  },
};
