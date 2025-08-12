const { ManagerEventTypes } = require("magmastream");

module.exports = {
  name: ManagerEventTypes.PlayerMove,
  execute(client, player, initChannel, newChannel) {
    console.log(
      `Player ${player.id} moved from channel ${initChannel} to ${newChannel}`
    );
    player.setVoiceChannelId(newChannel);
  },
};
