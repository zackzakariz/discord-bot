const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Serverinfo",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { guild } = interaction;

        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;

        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addFields(
            {
                name: "GENERAL",
                value: [
                    `Name: ${guild.name}`,
                    `Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                    `Owner: <@${ownerId}>`,
                    `Description: ${description}`


                ].join("\n")

            },
            {
                name: "📌 | USERS",
                value: [
                `
                - Members: ${members.cache.filter((m) => !m.user.bot).size}
                - Bots: ${members.cache.filter((m) => m.user.bot).size}

                Total: ${memberCount}
                `
                ].join("\n")
            },
            {
                name: "📗 | CHANNELS",
                value: [
                `
                - Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                - Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                - Threads: ${channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_PUBLIC_THREAD").size}
                - Categories: ${channels.cache.filter((c) => c.type === "GUILD.CATEGORY").size}
                - News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}

                Total: ${channels.cache.size}
                `
                ].join("\n")
            },
            {
                name: "😀 | EMOJIS & STICKERS",
                value: [
                    `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                    `- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
                    `- Stickers: ${stickers.cache.size}`,
                    `Total: ${stickers.cache.size + emojis.cache.size}`,
                ].join("\n") 
            },
            {
                name: "✨ | NITRO STATICS",
                value: [
                `
            - Roles: ${guild.roles.cache.size}
            - Tier: ${guild.premiumTier.replace("TIER_", "")}
            - Boosts: ${guild.premiumSubscriptionCount}
            - Booster: ${members.cache.filter((m) => m.premiumSince).size}

                `
                ].join("\n")
            }
        )
        .setFooter({ text: "Last Checked:"}).setTimestamp();

        interaction.reply({embeds: [Embed]})
    }
}