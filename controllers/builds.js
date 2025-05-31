const Build = require("../models/Build");

module.exports = {
  getBuilds: async (req, res) => {
    try {
      //arrays of build documents
      const builds = await Build.find({});
      //store requesting user so they can delete their builds
      let reqUser = req.user.userName;

      //trigger render aka invoke ejs return
      res.render("builds.ejs", { builds: builds, reqUser: reqUser });
      console.log(req);
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
    }
  },
  deleteBuild: async (req, res) => {
    if (req.user.isVerified) {
      console.log(req.body.jobIdFromJsFile);
      try {
        await Build.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
        console.log("Deleted build");
        res.json("Deleted It");
      } catch (err) {
        console.log(err);
      }
    }
  },
};
