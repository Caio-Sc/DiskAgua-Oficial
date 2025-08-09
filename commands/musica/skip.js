const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pula para a próxima música na fila")
    .addNumberOption((option) =>
      option.setName("quantidade")
        .setDescription("Número de músicas a serem puladas")
        .setRequired(false)
        .setMinValue(1)
),
  async execute(interaction) {
    const quantidade = interaction.options.getNumber("quantidade") || 1;
    const respondeEmbed = new EmbedBuilder().setColor(embedColor);

    const client = interaction.client;
    const serverId = interaction.guildId;
    const player = client.manager.getPlayer(serverId);
    if (!player.queue.current) {
      respondeEmbed.setTitle("Não há música tocando no momento.");
    } else {
      respondeEmbed
        .setTitle("Pulando para a próxima música")
        .setFooter({
          text: `Requisitado por ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();
      player.stop(quantidade);
    }
    await interaction.reply({
      embeds: [respondeEmbed],
    });
  },
};
