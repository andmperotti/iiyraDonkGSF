const Request = require("../models/Request");

module.exports = {
  getRequestedItems: async (req, res) => {
    try {
      //arrays of requested documents
      const requestedGems = await Request.find({
        userName: req.user.userName,
        itemType: "Gem",
      });
      const requestedUniques = await Request.find({
        userName: req.user.userName,
        itemType: "Unique",
      });
      const requestedOthers = await Request.find({
        userName: req.user.userName,
        itemType: "Other",
      });

      //trigger render aka invoke ejs return
      res.render("request.ejs", {
        gems: requestedGems,
        uniques: requestedUniques,
        others: requestedOthers,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createRequestedItem: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Request.create({
          requestedItem: req.body.requestedItem,
          completed: false,
          userName: req.user.userName,
          itemType: req.body.itemType,
          discordName: req.user.discordName,
          requestedDate: new Date().toJSON().slice(0, 10),
        });
        res.redirect("/request");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/request");
      console.log("user not verified");
    }
  },
  markComplete: async (req, res) => {
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
  },
  markIncomplete: async (req, res) => {
    try {
      await Request.findOneAndUpdate(
        { _id: req.body.requestIdFromJsFile },
        {
          completed: false,
          // eslint-disable-next-line prettier/prettier
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
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
