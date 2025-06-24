const Request = require("../models/Request");

module.exports = {
  getGems: async (req, res) => {
    try {
      //arrays of gem documents
      const requestedGems = await Request.find({
        itemType: "Gem",
        completed: false,
      });

      //trigger render aka invoke ejs return
      res.render("gems.ejs", {
        gems: requestedGems,
        requestor: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
