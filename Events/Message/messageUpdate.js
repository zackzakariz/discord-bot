const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "")
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "")

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 a [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n **Original**:\n [ ${Original} ] \n**Edited**:\n [ ${Edited} ]`)
        .setFooter({text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`});

        new WebhookClient({url : "https://discord.com/api/webhooks/951359020009140284/dwvHXIgOZltW2CeUOnX9Whx5Iobvy10SZitiLq6fSaxx2-CFkzDhuxBsM8lDNyZHDtve"}).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}