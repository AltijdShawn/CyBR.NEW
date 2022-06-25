const { Command } = require('yuuko');
const got = require('got');
module.exports = new Command('reddit', (message, args) => {
    got(`https://www.reddit.com/r/${args[0]}/random/.json`).then((response) => {
        // code here
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;

        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        const nsfw = post.data.over_18;
        
        if (nsfw && !message.channel.nsfw) return message.channel.createMessage("I'm sorry :slight_frown:\nBut i can't post NSFW Content in an SFW channel!")
        message.channel.createMessage({
            embed: {
                title: memeTitle,
                url: memeUrl,
                image: {
                    url: memeImage,
                },
                color: 15267908,
                footer: {
                    text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`,
                },
            },
        });
    }).catch(err => {
        console.error(err);
    });
});