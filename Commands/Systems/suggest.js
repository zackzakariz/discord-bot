const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "suggest",
    description: "Suggest",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "type",
            description: "Select an options",
            type: "STRING",
            required: true,
            choices: [
                {name: "Command"}
            ]
        }
    ]
}