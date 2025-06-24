const User = require("../models/User");

module.exports = {
  getPanel: async (req, res) => {
    if (!req.user.isAdmin) {
      return res.redirect("/request");
    }
    try {
      const users = await User.find({});
      users.sort((a, b) => a.userName - b.userName);
      res.render("adminPanel", { users });
    } catch (err) {
      console.log(err);
    }
  },
  verifyUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.body.requestIdFromJsFile },
        {
          isVerified: true,
          // eslint-disable-next-line prettier/prettier
        }
      );
      console.log("Verified User");
      res.json("User Verified");
    } catch (err) {
      console.log(err);
    }
  },
  adminUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.body.requestIdFromJsFile },
        {
          isAdmin: true,
          // eslint-disable-next-line prettier/prettier
        }
      );
      res.json("Admin added");
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      //add logic to delete all their entries
      await User.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
      console.log("User Deleted");
      res.json("User Delete Complete");
    } catch (err) {
      console.log(err);
    }
  },
};
