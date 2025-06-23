const Request = require("../models/Request");

module.exports = {
  getUniques: async (req, res) => {
    try {
      //arrays of uniques documents
      const requestedUniques = await Request.find({ itemType: "Unique" });

      //trigger render aka invoke ejs return
      res.render("uniques.ejs", { uniques: requestedUniques });
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Request.findOneAndUpdate(
          { _id: req.body.requestIdFromJsFile },
          {
            completed: true,
            // eslint-disable-next-line prettier/prettier
          }
        );
        console.log("Marked Complete");
        res.json("Marked Complete");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/request");
      console.log("user not verified");
    }
  },
  deleteRequested: async (req, res) => {
    try {
      await Request.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
      console.log("Deleted request");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
