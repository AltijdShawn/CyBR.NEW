const cfg = require('./cfg');
process.env=cfg;
const Sharder = require('eris-sharder').Master;
const sharder = new Sharder(process.env.TOKEN, "/Bot.js", {
  stats: true,
  debug: true,
  guildsPerShard: 2,
  name: "CyBR",
});
 
sharder.on("stats", stats => {
  console.log(stats);
});