const cfg = require("../cfg");
process.env = cfg;
const db = require("quick.db");
const pkg = require("../package.json");
const { default: axios } = require("axios");

module.exports = async (client) => {
  // if (!process.env)
  //   throw new Error(
  //     "No ENV file was Found in env! [https://github.com/zyrouge/eris-music-bot]"
  //   );
  // if (!process.env.TOKEN || process.env.TOKEN == "")
  //   throw new Error(
  //     "No Discord Token was Found in env! [https://github.com/zyrouge/eris-music-bot]"
  //   );
  // if (!process.env.PREFIX || process.env.PREFIX == "")
  //   throw new Error(
  //     "No Prefix was Found in env! [https://github.com/zyrouge/eris-music-bot]"
  //   );
  // if (!process.env.YTTOKEN || process.env.YTTOKEN == "")
  //   throw new Error(
  //     "No YouTube Token was Found in env! [https://github.com/zyrouge/eris-music-bot]"
  //   );
  // if (!process.env.GENIUS || process.env.GENIUS == "")
  //   console.log(
  //     "No Genius Token was Found in env! Lyrics command will not Work! [https://github.com/zyrouge/eris-music-bot]"
  //   );
  // if (!process.env.OWNER || process.env.OWNER == "")
  //   console.log(
  //     "No Discord Token was Found in env! Eval, Execute, Reload command will not Work! [https://github.com/zyrouge/eris-music-bot]"
  //   );

  let init = () => {
    // update local DB
    db.set("Bot-username", client.user.username);
    db.set("Bot-discriminator", client.user.discriminator);
    db.set("Bot-version", pkg.version);
    db.set("Bot-desc", pkg.description);
    db.set("Bot-authors", pkg.author);
    db.set("Servers-size", client.guilds.size);
    db.set("Bot-usrid", client.user.id);

    // update API DB
    axios({
        method: "post",
        url: cfg.APIURIMAIN + "C/",
        data: {
          id: "Bot_" + client.user.id,
          cmd: "set",
          type: "botData",
          data: {
            username: client.user.username,
            discriminator: client.user.discriminator,
            id: client.user.id,
            version: pkg.version,
            description: pkg.description,
            authors: pkg.author,
            serverCount: client.guilds.size,
          },
        },
      })
      .then((response) => console.log(response.data));
  };
  init();
};
