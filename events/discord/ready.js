const { Events, ActivityType, PresenceUpdateStatus } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    // IMPORTANTE: inicializa o manager com o ID do bot
    client.manager.init(client.user.id);

    client.user.setPresence({ activities: [{ name: 'música', type: ActivityType.Listening }], status: PresenceUpdateStatus.DoNotDisturb });

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
