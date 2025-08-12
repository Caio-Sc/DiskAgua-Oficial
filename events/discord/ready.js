const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    // IMPORTANTE: inicializa o manager com o ID do bot
    await client.manager.init({ clientId: client.user.id });


    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
