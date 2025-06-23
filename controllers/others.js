const Request = require("../models/Request");

module.exports = {
  getOthers: async (req, res) => {
    try {
      //arrays of others documents
      const requestedOthers = await Request.find({ itemType: "Other" });

      //trigger render aka invoke ejs return
      res.render("others.ejs", { others: requestedOthers });
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
