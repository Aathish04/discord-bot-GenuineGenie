const path = require('path');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(100);

const config = require('./config.json');
const roleClaim = require('./global-listeners/role-claim/role-claim.js');
const welcome = require('./global-listeners/welcome-message/welcome1.js');
const memberCount = require('./global-listeners/memeber-count/member-count.js');
const messageCounter = require('./global-listeners/message-counter/message-counter.js');
const economy = require('./global-listeners/economy/economy.js');
const mongo = require('./mongo');

console.log('Starting up Discord Client...');
client.on('ready', async () => {
    console.log('Estabished connection with Discord...');
    console.log(`Logged in as ${client.user.tag}!\n`);

    await mongo().then((mongoose) => {
        try {
            console.log('Estabished connection with MongoDB...');
        } finally {
            mongoose.connection.close();
        }
    });
    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);

    // Registering all the commands
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const options = require(path.join(__dirname, dir, file));
                commandBase(client, options);
            }
        }
    };
    readCommands('commands');

    // Setting bot's status
    client.user.setPresence({
        activity: {
            name: `"${config.prefix} help" for help`,
        },
    });

    // initialising the role-claim chanel
    roleClaim(client);

    //setting up welome
    welcome(client);

    //Member Count channel
    memberCount(client);

    //Message Counter
    messageCounter(client);
});

client.login(config.token);
