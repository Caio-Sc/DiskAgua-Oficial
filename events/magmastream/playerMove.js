const { ManagerEventTypes } = require("magmastream");

module.exports = {
  name: ManagerEventTypes.PlayerMove,
  execute(client, player, initChannel, newChannel) {
    player.setVoiceChannelId(newChannel);
  },
};
