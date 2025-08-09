const { Events } = require("discord.js");

module.exports = {
  name: Events.Raw,
  once: false,
  async execute(client, data) {
    await client.manager.updateVoiceState(data);
  },
};
