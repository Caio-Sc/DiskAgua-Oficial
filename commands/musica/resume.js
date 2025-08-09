const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Continua a música atual"),
  async execute(interaction) {
    const respondeEmbed = new EmbedBuilder().setColor(embedColor);

    const client = interaction.client;
    const serverId = interaction.guildId;
    const player = client.manager.getPlayer(serverId);
    if (!player.queue.current) {
      respondeEmbed.setTitle("Não há música tocando no momento.");
    } else {
      respondeEmbed
        .setTitle("Continuando a música")
        .setFooter({
          text: `Requisitado por ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();
      player.pause(false);
    }
    await interaction.reply({
      embeds: [respondeEmbed],
    });
  },
};
