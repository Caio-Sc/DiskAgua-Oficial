const { ManagerEventTypes, TrackEndReasonTypes } = require("magmastream");
const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
  name: ManagerEventTypes.QueueEnd,
  async execute(client, player, track, payload) {
    const channel = client.channels.cache.get(player.textChannelId);
    if (!channel) return;
    if (payload.reason !== TrackEndReasonTypes.Finished) return;

    const respondeEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle("Fila Encerrada")
    .setDescription("Todas as músicas da fila foram tocadas.");

    channel
      .send({ embeds: [respondeEmbed] })
      .catch((error) =>
        console.log(
          `[QUEUEEND] Failed to send message to channel: ${player.textChannelId}`
        )
      );
  },
};
