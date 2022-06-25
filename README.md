# CyBR
**Warning** The bot is incomplete so if you want to help feel free to help
<hr></hr>

### Required:
* FFMPEG (Installed on your system or add it to your project with `yarn add ffmpeg-static`)
* node.js (Version **14** (if you don't have it installed just use nvm [Linux and mac](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows))
* Python2.7
* yarn (You can install it with `npm --global install yarn`) **Actually not required but highly recommended**
* And knowledge of the Eris javascript framework
* - Knowledge of [Yuuko](https://github.com/eritbh/yuuko).
* - Knowledge of [Eris](https://github.com/abalabahaha/eris).

### Configuration:
Rename `cfg.template.js` to `cfg.js`
then in `cfg.js` it should look like this
just fill in everything and you are good to go
```js
module.exports = {
    TOKEN: "<The discord bot token>",
    OWNER: "<The bot owner ID>",
    PREFIX: "<The default prefix>",
    MONGO_URL: "<The MongoDB database URI>",
    SECRET: "<just put a lot of random characters here, it's to secure stuff>",
    REDIRECT: "/auth/redirect",
    YTTOKEN: "<Youtube API Token>",
    REPO: "https://github.com/project-helix/CyBR/",

    APIURIMAIN: "http://localhost:3000/",

    WEBSERVER: {
        IP: "0.0.0.0",
        PORT: 8080
    }
};
```