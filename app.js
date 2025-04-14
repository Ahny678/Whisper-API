var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const draftRouter = require("./routes/draft");
const exploreRouter = require("./routes/explore");
require("./cron/trendingJob");

var app = express();
//DATABASE CONFIGS---------------------------------------
var sequelize = require("./config/database");
const Post = require("./models/post");
const Share = require("./models/share");
const Comment = require("./models/comment");
const Token = require("./models/token");
const Trending = require("./models/trending");
const Like = require("./models/like");
(async () => {
  try {
    await sequelize.authenticate();
    sequelize;

    console.log("> Database connected successfully!");
  } catch (error) {
    console.error("> Database connection error:", error);
  }
})();
//--------------------------------------------------

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/drafts", draftRouter);
app.use("/explore", exploreRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
