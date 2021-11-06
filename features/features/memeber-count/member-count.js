module.exports = (client) => {
   const channelId = '789921331155304450'; // member Count channel

   const updateMemmbers = (guild) => {
      const channel = guild.channels.cache.get(channelId);
      if (!channel) return;
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
   };

   client.on('guildMemberAdd', (member) => updateMemmbers(member.guild));
   client.on('guildMemberRemove', (member) => updateMemmbers(member.guild));

   const guild = client.guilds.cache.get('789902755153313862');
   updateMemmbers(guild);
};
