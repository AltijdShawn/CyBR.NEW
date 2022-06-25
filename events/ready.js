const { EventListener } = require("yuuko");
const db = require("quick.db");
const pkg = require("../package.json");
const cfg = require("../cfg");
const init = require("../utils/init");
process.env = cfg;

module.exports = new EventListener("ready", ({ client }) => {
  // context.client = bot
  client.log(
    client.chalk.blue(
      `Logged in as ${client.chalk.red(
        client.user.username + "#" + client.user.discriminator
      )} (${client.chalk.yellow(client.guilds.size)}) Servers!`
    )
  );
  client.editStatus("dnd", {
    name: `Prefix: " ${client.prefix} "\n♪ My music sounds good :)`,
    type: 3,
  });
//   setTimeout(() => {
//     console.log(`
// >===============================================<
//               Made by AmyTheCutie
//     GitHub: 
//     Discord: https://discord.gg/pvtzCgfTJ4
// >===============================================<`);
//   }, 5000);
  init(client);
});
