const Build = require("../models/Build");

module.exports = {
  getBuilds: async (req, res) => {
    try {
      //arrays of build documents
      const builds = await Build.find({});

      //trigger render aka invoke ejs return
      res.render("builds.ejs", { builds: builds, requestor: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createBuild: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Build.create({
          buildName: req.body.buildName,
          buildCharacterName: req.body.buildCharacterName,
          buildResource: req.body.buildResource,
          completed: false,
          userName: req.user.userName,
        });
        console.log("Todo has been added!");
        res.redirect("/builds");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/restricted");
      console.log("user not verified");
    }
  },
  deleteBuild: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Build.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
        console.log("Deleted build");
        res.json("Deleted It");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/restricted");
      console.log("user not verified");
    }
  },
};
