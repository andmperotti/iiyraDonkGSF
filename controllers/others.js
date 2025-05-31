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
    }
  },
};
