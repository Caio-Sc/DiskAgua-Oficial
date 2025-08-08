const { ManagerEventTypes } = require("magmastream");

module.exports = {
  name: ManagerEventTypes.PlayerDisconnect,
  async execute(client, player, track, payload) {
    player.destroy();
  },
};
