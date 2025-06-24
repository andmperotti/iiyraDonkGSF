const Request = require("../models/Request");

module.exports = {
  getUniques: async (req, res) => {
    try {
      //arrays of uniques documents
      const requestedUniques = await Request.find({
        itemType: "Unique",
        completed: false,
      });

      //trigger render aka invoke ejs return
      res.render("uniques.ejs", {
        uniques: requestedUniques,
        requestor: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
