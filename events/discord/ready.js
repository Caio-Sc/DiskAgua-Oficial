const { Events } = require("discord.js");


module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
	// IMPORTANTE: inicializa o manager com o ID do bot
    client.manager.init(client.user.id);

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
