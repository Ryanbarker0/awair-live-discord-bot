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

const abc = {
	  "title": "Quality Check",
	  "description": "Barksie's lungs are currently:\n\n <:widepeepohappyx:819629783670718496> widePeepoHappy <:widepeepohappyx:819629783670718496>",
	  "url": "https://discordapp.com",
	  "color": 5432902,
	  "timestamp": "2021-03-11T17:13:13.303Z",
	  "footer": {
		"icon_url": "https://proptechzone.com/wp-content/uploads/2019/10/Awair-544898ce-6a66-4754-9917-9ce08e887f5a-1.png",
		"text": "Awair"
	  },
	  "thumbnail": {
		"url": "https://cdn.frankerfacez.com/emoticon/228449/4"
	  },
	  "fields": [
		{
		  "name": "Overall Quality",
		  "value": "97 / 100",
		  "inline": false
		},
		{
		  "name": ":cloud_rain:",
		  "value": "42.8 %",
		  "inline": true
		},
		{
		  "name": ":thermometer:",
		  "value": "20.8 °c",
		  "inline": true
		},
			  {
		  "name": "CO²",
		  "value": "403 ppm",
		  "inline": true
		},
		{
		  "name": "PM2.5",
		  "value": "403 µg/m³",
		  "inline": true
		},
			  {
		  "name": "Chemicals",
		  "value": "52 ppb",
		  "inline": true
		}
	  ]
	}



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
