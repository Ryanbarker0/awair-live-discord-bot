require('dotenv').config();
const embedBuilder = require('./src/embedBuilder')
const fetchAirData = require('./src/fetchAirData')
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

const generateEmbed = async () => {
	const airData = await fetchAirData()
	const embedContent = embedBuilder(airData)

	return new Discord.MessageEmbed(embedContent)
}

bot.on('message', async msg => {
  if (msg.content === '!air') {
	const embed = await generateEmbed()
    msg.channel.send(embed);
  }
});
