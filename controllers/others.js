const Request = require("../models/Request");

module.exports = {
  getOthers: async (req, res) => {
    try {
      //arrays of others documents
      const requestedOthers = await Request.find({
        itemType: "Other",
        completed: false,
      });

      //trigger render aka invoke ejs return
      res.render("others.ejs", {
        others: requestedOthers,
        requestor: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
