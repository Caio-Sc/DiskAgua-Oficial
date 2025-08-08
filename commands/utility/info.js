const { SlashCommandBuilder, MessageFlags, InteractionContextType, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../config.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Pegue informações sobre o usuário ou servidor")
    .setContexts(InteractionContextType.Guild)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("usuário")
        .setDescription("informações sobre o usuário")
        .addUserOption((option) =>
          option
            .setName("alvo")
            .setDescription("selecione um usuário")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("informações sobre o servidor")
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "usuário") {
      const user = interaction.options.getUser("alvo");
      const respostaEmbed = new EmbedBuilder()
    	.setColor(embedColor)
        .setTitle('Informações do Usuário')
        .setThumbnail(user.displayAvatarURL())
    	.addFields(
    		{ name: 'Nome de Usuário', value: user.username, inline: true },
    		{ name: 'ID', value: user.id, inline: true },
            { name: 'Tag', value: user.tag, inline: true },
            { name: 'Conta criada em', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'Informações solicitadas' });



      await interaction.reply({
        // content: `Usuário: ${user.username}\nID: ${user.id}`,
        embeds: [respostaEmbed],
        flags: MessageFlags.Ephemeral,
      });
    } else if (subcommand === "server") {
      const guild = interaction.guild;
      const respostaEmbed = new EmbedBuilder()
    	.setColor(embedColor)
        .setTitle('Informações do Servidor')
        .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Nome do Servidor', value: guild.name, inline: true },
        		{ name: 'ID', value: guild.id, inline: true },
                { name: 'Criado em', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
                { name: 'Membros', value: `${guild.memberCount}`, inline: true },
            )
        .setTimestamp()
        .setFooter({ text: 'Informações solicitadas' });
      await interaction.reply({
        embeds: [respostaEmbed],
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
