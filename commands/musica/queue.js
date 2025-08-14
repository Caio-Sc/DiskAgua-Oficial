const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../config.json");
const formatTime = require("../../utils/formatTime");
const criarBarraDeProgresso = require("../../utils/criarBarraDeProgresso");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Mostra a fila de músicas"),
  async execute(interaction) {
    const tocandoAgoraEmbed = new EmbedBuilder().setColor(embedColor);
    const filaEmbed = new EmbedBuilder().setColor(embedColor);
    const client = interaction.client;
    const serverId = interaction.guildId;
    const player = client.manager.getPlayer(serverId);
    if (!player || !player.queue.current) {
      tocandoAgoraEmbed.setTitle("Não há músicas na fila.");
      interaction.reply({ embeds: [tocandoAgoraEmbed] });
    } else {
      const queue = player.queue; // Mostra apenas as próximas 10 músicas na fila
      const currentTrack = queue.current;
      const playerPosition = player.position || 0; // Posição atual do player
      const tracksList = queue
        .slice(0, 10)
        .map(
          (track, index) =>
            `${index + 1}. [${track.title}](${track.uri}) (${
              track.isStream ? "Ao Vivo" : formatTime(track.duration)
            })`
        )
        .join("\n");
      tocandoAgoraEmbed
        .setTitle(`**Tocando agora**`)
        .setDescription(
          `[${currentTrack.title}](${currentTrack.uri}) ${
            currentTrack.isStream
              ? "(Ao Vivo)"
              : "\n" + criarBarraDeProgresso(currentTrack, playerPosition)
          }`
        )
        .setFooter({
          text: `Requisitado por ${currentTrack.requester.username}`,
          iconURL: `https://cdn.discordapp.com/avatars/${currentTrack.requester.id}/${currentTrack.requester.avatar}.webp`,
        })
        .setTimestamp();
      if (tracksList.length > 0) {
        filaEmbed
          .setTitle(`**Fila:**`)
          .setDescription(`${tracksList}`)
          .setFooter({
            text: `Tempo total da fila: ${formatTime(
              await queue.duration() - playerPosition
            )} (${queue.length})`,
          })
          .setTimestamp();
        await interaction.reply({ embeds: [tocandoAgoraEmbed, filaEmbed] });
      } else {
        await interaction.reply({ embeds: [tocandoAgoraEmbed] });
      }
    }
  },
};
