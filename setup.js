const cfg = require("./cfg");
const db = require("quick.db");

let setDBDefaults = () => {
    db.set("Bot-prefix", cfg.PREFIX)
}

setDBDefaults()