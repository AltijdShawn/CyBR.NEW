const { Command } = require('yuuko');

module.exports = new Command(['hru', 'howareyou'], (message, args, context) => {
//   if(message.content.startsWith("<@!617275782149963776> hru")) {
        let replies = context.client.replies.hru;
        let replyNum = Math.floor(Math.random() * replies.length);
        let status = replies[replyNum];
        message.channel.createMessage(`${status}`)
//   }
});