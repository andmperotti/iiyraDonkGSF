const Request = require("../models/Request");

module.exports = {
  getGems: async (req, res) => {
    try {
      //arrays of gem documents
      const requestedGems = await Request.find({ itemType: "Gem" });

      //trigger render aka invoke ejs return
      res.render("gems.ejs", { gems: requestedGems });
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
  markIncomplete: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Request.findOneAndUpdate(
          { _id: req.body.requestIdFromJsFile },
          {
            completed: false,
          }
        );
        console.log("Marked Incomplete");
        res.json("Marked Incomplete");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/request");
      console.log("user not verified");
    }
  },
};
