const { EmbedBuilder } = require("discord.js");
const { ManagerEventTypes } = require("magmastream");
const { embedColor } = require("../../config.json");
const formatTime = require("../../utils/formatTime");

module.exports = {
  name: ManagerEventTypes.TrackStart,
  async execute(client, player, track, payload) {
    const channel = client.channels.cache.get(player.textChannelId);
    if (!channel) return;

    // console.log(track.requester)

    const respondeEmbed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle("Tocando Agora")
      .addFields(
        {
          name: "Música",
          value: `[${track.title}](${track.uri})`,
          inline: false,
        },
        {
          name: "Autor",
          value: `${track.author}`,
          inline: true,
        },
        {
          name: "Duração",
          value: `${track.isStream ? "Ao Vivo" : formatTime(track.duration)}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Requisitado por ${track.requester.username}`,
        iconURL: `https://cdn.discordapp.com/avatars/${track.requester.id}/${track.requester.avatar}.webp`
      })
      .setThumbnail(track.thumbnail);

    channel
      .send({embeds: [respondeEmbed]})
      .catch((error) =>
        console.log(
          `[QUEUEEND] Failed to send message to channel: ${player.textChannelId}`
        )
      );
  },
};
