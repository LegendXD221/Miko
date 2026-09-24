const Discord = require("discord.js");
const { SlashCommandBuilder } = Discord;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("miko")
    .setDescription("Meet Miko, your cozy Discord companion"),

  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const version = require(`${process.cwd()}/package.json`).version;
    const guildCount = client.shard
      ? (await client.shard.fetchClientValues("guilds.cache.size"))
          .reduce((total, count) => total + count, 0)
      : client.guilds.cache.size;

    const buttons = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setLabel("Invite Miko")
        .setEmoji("🎀")
        .setURL(client.config.discord.botInvite)
        .setStyle(Discord.ButtonStyle.Link),
      new Discord.ButtonBuilder()
        .setLabel("Support")
        .setEmoji("🌸")
        .setURL(client.config.discord.serverInvite)
        .setStyle(Discord.ButtonStyle.Link),
    );

    return client.embed(
      {
        title: "🌸・Hello, I’m Miko!",
        desc: "Your cozy Discord companion for helpful tools, tiny games, music, and a little extra sparkle ✿",
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [
          {
            name: "✨ What I can do",
            value: "Moderation • Music • Economy • Leveling\nTickets • Games • Giveaways • Utilities",
            inline: false,
          },
          {
            name: "🧸 Cozy corner",
            value: "Try `/help` to explore my commands, or `/ping` to see if I’m feeling speedy.",
            inline: false,
          },
          {
            name: "📊 Little stats",
            value: `Caring for **${guildCount}** servers\nVersion **${version}** • API **${client.ws.ping}ms**`,
            inline: true,
          },
          {
            name: "💖 Made to feel nice",
            value: "Pastel embeds, soft replies, and useful tools for your community.",
            inline: true,
          },
        ],
        components: [buttons],
        type: "reply",
      },
      interaction,
    );
  },
};
