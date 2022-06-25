const { Command } = require("yuuko")
const db = require("quick.db");
const cfg = require('../../cfg');
const axios = require('axios');
process.env=cfg;

let setDB = (CellName, Value) => db.set(CellName, Value);
let getDB = (CellName, Value) => { return db.get(CellName); }

module.exports = new Command("api", (message, args, context) => {
    if (message.author.id == process.env.OWNER) {
        const client = context.client;

        const baseURI=cfg.APIURIMAIN

        if (args[0] === "set") {
            axios.post(baseURI + "C/set/" + args[1] + "/" + args[2] + "/" + args[3] ).then(response => {
                console.log(response.data)
                message.channel.createMessage(`${response.data}`)
            })
        }
        if (args[0] === "get") {
            axios.post(baseURI + "C/get/" + args[1] + "/" + args[2]).then(response => {
                console.log(response.data)
                message.channel.createMessage(`${response.data}`)
            })
        }
        if (args[0] === "delete") {
            axios.post(baseURI + "C/delete/" + args[1] + "/" + args[2]).then(response => {
                console.log(response.data)
                message.channel.createMessage(`${response.data}`)
            })
        }
        if (args[0] === "getFull") {
            axios.post(baseURI + "result" + args[1]).then(response => {
                console.log(response.data)
                message.channel.createMessage(`${response.data}`)
            })
        }
    }
    else return message.channel.createMessage("You can't use Owner only commands")
})