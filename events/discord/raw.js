const { Events } = require("discord.js");

module.exports = {
  name: Events.Raw,
  once: false,
  execute(client, data) {
    client.manager.updateVoiceState(data);
  },
};
