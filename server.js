const express = require("express");
const app = express();
// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const requestRoutes = require("./routes/request");
const userRoutes = require("./routes/users");
const uniqueRoutes = require("./routes/uniques");
const otherRoutes = require("./routes/others");
const gemRoutes = require("./routes/gems");
const buildRoutes = require("./routes/builds");
const jobRoutes = require("./routes/jobs");
const seasonWipe = require("./routes/seasonWipe");
const adminPanel = require("./routes/adminPanel");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    // eslint-disable-next-line prettier/prettier
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//flash used for sign up validation
app.use(flash());
//routes for different endpoints
app.use("/", mainRoutes);
app.use("/request", requestRoutes);
app.use("/users", userRoutes);
app.use("/uniques", uniqueRoutes);
app.use("/others", otherRoutes);
app.use("/gems", gemRoutes);
app.use("/builds", buildRoutes);
app.use("/jobs", jobRoutes);
app.use("/seasonWipe", seasonWipe);
app.use("/admin", adminPanel);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
