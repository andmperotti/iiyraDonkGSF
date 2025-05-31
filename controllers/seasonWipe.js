const Request = require("../models/Request");
const Job = require("../models/Job");
const Build = require("../models/Build");

module.exports = {
  seasonWipe: async (req, res) => {
    if (req.user.userName === "Drevvska") {
      try {
        await Build.deleteMany();
        console.log("Builds deleted");

        await Request.deleteMany();
        console.log("Requested items deleted");

        await Job.deleteMany();
        console.log("Jobs deleted");

        res.render("seasonWipe.ejs");
      } catch (err) {
        console.log(err);
      }
    }
  },
};
