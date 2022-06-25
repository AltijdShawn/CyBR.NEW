const client = require("./base/Client.js");
const path = require("path");

require(path.resolve("utils", "init"))(client);

const youtube = new (require("simple-youtube-api"))(process.env.YTTOKEN);
const musicClient = require(path.resolve("base", "Music"));

client.music = new musicClient(youtube, client);

client.connect();
