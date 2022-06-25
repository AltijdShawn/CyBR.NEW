/**
 * Module dependencies.
 */

const cfg = require("../cfg");
const fetch = require("node-fetch");
const db = require("quick.db");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = (module.exports = express());
const server = require("http").Server(app);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.enable("verbose errors");

if (app.settings.env === "production") app.disable("verbose errors");

// app.use(morgan("dev"));

app.engine(".ejs", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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

const ipaddress = cfg.WEBSERVER.IP;
const serverport = cfg.WEBSERVER.PORT;
server.listen(serverport, ipaddress, async function () {
  await console.log("[DEBUG] Listening on " + ipaddress + ":" + serverport);
});
