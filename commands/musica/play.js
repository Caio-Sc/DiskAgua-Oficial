const {
  SlashCommandBuilder,
  MessageFlags,
  EmbedBuilder,
} = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toque uma música")
    .addStringOption((option) =>
      option
        .setName("música")
        .setDescription("Música a ser tocada")
        .setRequired(true)
    ),
  async execute(interaction) {
    const respondeEmbed = new EmbedBuilder().setColor(embedColor);
    const client = interaction.client;
    const link = interaction.options.getString("música");
    const song = link.includes("&") ? link.split("&")[0] : link;
    const voiceID = interaction.member.voice.channelId;
    const textID = interaction.channelId;
    const serverId = interaction.guildId;
    let res;
    if (!voiceID) {
      respondeEmbed.setTitle("Você precisa estar em um canal de voz!");
      await interaction.reply({
        embeds: [respondeEmbed],
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    try {
      res = await client.manager.search(song, interaction.user);
      // console.log(res);
      // Check the load type
      if (res.loadType === "empty" || res.loadType === "error") {
        respondeEmbed.setTitle("Música não encontrada!");
        await interaction.reply({
          embeds: [respondeEmbed],
          flags: MessageFlags.Ephemeral,
        });
        console.error("Could not find the song");
        return;
      }
    } catch (err) {
      respondeEmbed.setTitle("Erro procurando música!");
      await interaction.reply({
        embeds: [respondeEmbed],
        flags: MessageFlags.Ephemeral,
      });
      console.error("Error while searching for the song:", err);
      return;
    }

    let player = client.manager.getPlayer(serverId);
    
    if (!player) {
      player = client.manager.create({
        guildId: serverId,
        textChannelId: textID,
        voiceChannelId: voiceID,
        selfDeafen: true,
        volume: 100,
      });
    } else {
      player.setVoiceChannelId(voiceID);
    }
    player.connect();
    
    const shouldStart = (!player.playing && !player.paused) || !player.queue.current; //verifica se o player está tocando ou pausado, ou se não há música atual na fila
    if (res.loadType === "playlist") {
      titulo = `Playlist: [${res.playlist.name}](${song})`;
      res.playlist.tracks.forEach(async (track) => await player.queue.add(track));
    } else {
      titulo = `[${res.tracks[0].title}](${res.tracks[0].uri})`;
      await player.queue.add(res.tracks[0]);
    }

    if (shouldStart) await player.play();

    respondeEmbed
      .setTitle("Adicionado a fila:")
      .setDescription(titulo)
      .setFooter({
        text: `Requisitado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();
    await interaction.reply({
      embeds: [respondeEmbed],
    });

    //   const channel =
  },
};
