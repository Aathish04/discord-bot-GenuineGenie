const dotenv = require('dotenv');
dotenv.config();

const config = {};

config.guildId = process.env.GUILD_ID;
config.anonymousChannelId = process.env.ANONYMOUS_CHANNEL_ID;

module.exports = config;
