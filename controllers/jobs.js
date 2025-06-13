const Job = require("../models/Job");

module.exports = {
  getJobs: async (req, res) => {
    try {
      const jobList = await Job.find({});

      //trigger render aka invoke ejs return
      res.render("jobs.ejs", { jobs: jobList, req: req });
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
      res.redirect("/request");
      console.log("user not verified");
    }
  },
  markComplete: async (req, res) => {
    if (req.user.isVerified) {
      try {
        await Job.findOneAndUpdate(
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
        await Job.findOneAndUpdate(
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
  deleteJob: async (req, res) => {
    if (req.user.isVerified) {
      console.log(req.body.jobIdFromJsFile);
      try {
        await Job.findOneAndDelete({ _id: req.body.requestIdFromJsFile });
        console.log("Deleted job");
        res.json("Deleted It");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/request");
      console.log("user not verified");
    }
  },
};
