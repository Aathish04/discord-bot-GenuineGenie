require('module-alias/register');

try {
   const Discord = require('discord.js');
   const client = new Discord.Client();

   const config = require('@root/appConfig.js');
   const loadCommands = require('@root/commands/load-commands');
   const loadFeatures = require('@root/features/load-features');
   const { loadPrefixes } = require('./commands/command-base');
   const mongo = require('@root/database/mongo');

   /* 
const { MongoClient } = require('mongodb');
const MongoDBProvider = require('commando-provider-mongo');
const Commando = require('discord.js-commando'); 
const client = new Commando.CommandoClient({
    owner: '384318671037661184',
    commandPrefix: '!',
}); */
   client.setMaxListeners(100);

   /* client.setProvider(
    MongoClient.connect(config.mongoURL)
        .then((client) => {
            return new MongoDBProvider(client, 'lesgo');
        })
        .catch((err) => {
            console.log(err);
        })
);
 */
   try {
      console.log('Starting up Discord Client...');
      client.on('ready', async () => {
         console.log('Estabished connection with Discord...');
         console.log(`Logged in as ${client.user.tag}!\n`);

         await mongo();
         /* client.registry
            .registerGroups([
                ['moderation', 'moderation commands'],
                ['misc', 'misc commands'],
                ['economy', 'money and economy system commands'],
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'cmds')); */

         // load Prefixes
         loadPrefixes(client);

         // Load commands
         loadCommands(client);

         // Load features
         loadFeatures(client);
      });
      console.log('consoling token');
      client.login(config.token);
   } catch (err) {
      console.log(err, '\n');
   }
} catch (err) {
   console.log(err, '\n');
}
