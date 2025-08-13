const { ManagerEventTypes } = require("magmastream");

module.exports = {
  name: ManagerEventTypes.PlayerDisconnect,
  async execute(client, player, track, payload) {
    console.log('Player disconnected from voice channel, destroying player.');
    await player.destroy();
  },
};
