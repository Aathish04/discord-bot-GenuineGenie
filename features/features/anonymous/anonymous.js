const { MessageEmbed } = require('discord.js');
const appConfig = require('@root/appConfig.js');
module.exports = (client) => {
   const channelId = appConfig.anonymousChannelId; // member Count channel

   let count = 0;
   client.on('message', async (og_message) => {
      const { content, member, guild, createdAt, channel } = og_message;
      og_message.delete();
      if (channel.id !== channelId) return;
      if (member.user.bot) return;
      if (content === 'reset') {
         count = 0;
         return;
      }
      const newEmbed = new MessageEmbed()
         .setAuthor(client.user.username, client.user.displayAvatarURL())
         .setColor('RANDOM')
         .setFooter('Ask anonymous questions in this channel.')
         .addFields({
            name: `Question [${++count}]`,
            value: `\`${content}\n\``,
         });
      const message = await channel.send(newEmbed);
      message.react('👍');
      message.react('👎');
      message.react('🔥');
      message.react('❤️');
   });
};
