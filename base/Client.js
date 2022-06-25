const chalk = require("chalk");
const { Client } = require("yuuko");
const db = require("quick.db");
const moment = require("moment");
const path = require('path');

const Eris = require("eris-additions")(require("eris"));
const cfg = require('../cfg');
process.env=cfg;

const client = new Eris(process.env.TOKEN, {
    disableEveryone: true,
    defaultImageSize: 512
});

client.Eris = Eris;
client.wait = require("util").promisify(setTimeout);
client.log = (text) => console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]: ${text}`);
client.db = new (require("enmap"))({ name: "db", fetchAll: false, autoFetch: true, cloneLevel: 'deep' });
client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();

client.cfg = cfg;
client.wait = require("util").promisify(setTimeout);
client.chalk = chalk;
client.log = (text) => console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]: ${text}`);
client.webServer = require("../website/index")
client.emojis = {
    "tick": "✅",
    "search": "🔍",
    "music": "🎵",
    "cross": "❌",
    "headphones": "🎧",

    "amber": {
        "normal": "<:Amber:731910188335890453>",
        "cry": "<:AmberCry:731967735939989605>",
        "hearteyes": "<:AmberHeartEyes:731967736019812433>",
        "CyBR": "<:CyBR:877630544769327154>",
        "CyBR_Round": "<:CyBR_Round:877630544245039145>",
        "status_dnd": "<:dnd:821099094851453000>",
        "status_idle": "<:idle:821099095506026496> ",
        "status_offline": "<:offline:821099095284383804>",
        "status_online": "<:online:821099095225532516>"
    }
};

module.exports = client;
