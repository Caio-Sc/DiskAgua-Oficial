const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Para a música atual e limpa a fila"),
  async execute(interaction) {
    const respondeEmbed = new EmbedBuilder().setColor(embedColor);

    const client = interaction.client;
    const serverId = interaction.guildId;
    const player = client.manager.getPlayer(serverId);
    if (!player.queue.current) {
      respondeEmbed.setTitle("Não há música tocando no momento.");
    } else {
      respondeEmbed
        .setTitle("Parando a música")
        .setFooter({
          text: `Requisitado por ${interaction.user.username}`,
          iconURL: await interaction.user.displayAvatarURL(),
        })
        .setTimestamp();
      player.queue.clear();
      player.stop();
    }
    await interaction.reply({
      embeds: [respondeEmbed],
    });
  },
};
