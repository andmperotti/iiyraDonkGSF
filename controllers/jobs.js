const Job = require("../models/Job");

module.exports = {
  getJobs: async (req, res) => {
    try {
      const jobList = await Job.find({});

      //trigger render aka invoke ejs return
      res.render("jobs.ejs", { jobs: jobList, requestor: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createJob: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Job.create({
          userName: req.user.userName,
          completed: false,
          jobName: req.body.jobItem,
          discordName: req.user.discordName,
        });
        res.redirect("/jobs");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/restricted");
      console.log("user not verified");
    }
  },
  deleteJob: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Job.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
        console.log("Deleted job");
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
