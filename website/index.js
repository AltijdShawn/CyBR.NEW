/**
 * Module dependencies.
 */

var express = require("express");
var path = require("path");
const db = require("quick.db");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

var app = (module.exports = express());

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine(".ejs", require("ejs").__express);

// Optional since express defaults to CWD/views

app.set("views", path.join(__dirname, "views"));

// Path to our public directory

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set("view engine", "ejs");

// Dummy users
var prefix = [];

app.get("/", function (req, res) {
  res.render("home", {
    db: db,
    cfg: require("../cfg"),
    title: `${db.get("Bot-username")} ~ Home`,
    prefix: prefix,
  });
});
app.get("/Owner", function (req, res) {
  res.render("Owner-Panel/index", {
    db: db,
    cfg: require("../cfg"),
    title: `${db.get("Bot-username")} ~ Owner Panel`,
    prefix: prefix,
  });
});
app.get("/dashboard", function (req, res) {
  res.render("dashboard/index", {
    db: db,
    cfg: require("../cfg"),
    title: `${db.get("Bot-username")} ~ dashboard`,
    prefix: prefix,
    dashboard: false,
  });
});
app.get("/auth", async ({ query }, response) => {
  const { code } = query;

  if (code) {
    try {
      const oauthResult = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
          client_id: db.get("Bot-id"),
          client_secret: require("../cfg").SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: `http://localhost:${3000}`,
          scope: "identify",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const oauthData = await oauthResult.json();

      const userResult = await fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });

      console.log(await userResult.json());
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error;
      // it will return a 401 Unauthorized response in the try block above
      console.error(error);
    }
  }

  return response.render("login", {
    root: ".",
    db: db,
    title: `${db.get("Bot-username")} ~ Login`,
  });
});

app.post("/Owner", (req, res) => {
  let botPrfx = req.body.botPrfx;

  db.set("Bot-prefix", botPrfx);
  res.redirect("/Owner");
});

/* istanbul ignore next */

app.listen(3000);
console.log("Express started on port 3000");
