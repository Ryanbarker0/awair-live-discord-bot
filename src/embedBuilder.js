const moment = require('moment')
module.exports = dynamicFields => {
	const {
		overall,
		humidity,
		temp,
		co2,
		pm25,
		voc
	} = dynamicFields

	let baseFields = {}

	const great = {
		description: "<:widepeepohappy_x:819648350366335067> widePeepoHappy <:widepeepohappy_x:819648350366335067>",
		color: 5432902,
		thumbnailUrl: 'https://cdn.frankerfacez.com/emoticon/228449/4'
	}
	const okay = {
		description: "<:feelsokayman_x:819647720830664749> Okay man <:feelsokayman_x:819647720830664749>",
		color: 15466329,
		thumbnailUrl: 'https://cdn.frankerfacez.com/emoticon/145947/4'
	}
	const bad = {
		description: "<:monkaS_x:548901165069238282> A lil bit spooky <:monkaS_x:548901165069238282>",
		color: 16755033,
		thumbnailUrl: 'https://cdn.frankerfacez.com/emoticon/130762/4'
	}
	const terrible = {
		description: ":skull_crossbones: Dead :skull_crossbones:",
		color: 16734553,
		thumbnailUrl: 'https://cdn.frankerfacez.com/emoticon/480711/4'
	}

	if (overall >= 80) {
		baseFields = great
	} else if (overall >= 60 && overall < 80) {
		baseFields = okay
	} else if (overall >=30 && overall < 60) {
		baseFields = bad
	} else if (overall < 30) {
		baseFields = terrible
	}


	return {
		"title": "Quality Check",
		"description": `Barksie's lungs are currently:\n\n ${baseFields.description}`,
		"color": baseFields.color,
		"timestamp": `${moment().format()}`,
		"thumbnail": {
		  "url": baseFields.thumbnailUrl
		},
		"fields": [
		  {
			"name": "Overall Quality",
			"value": `${overall} / 100`,
			"inline": false
		  },
		  {
			"name": ":cloud_rain:",
			"value": `${humidity} %`,
			"inline": true
		  },
		  {
			"name": ":thermometer:",
			"value": `${temp} °c`,
			"inline": true
		  },
				{
			"name": "CO²",
			"value": `${co2} ppm`,
			"inline": true
		  },
		  {
			"name": "PM2.5",
			"value": `${pm25} µg/m³ [ⁱ](https://blissair.com/what-is-pm-2-5.htm)`,
			"inline": true
		  },
				{
			"name": "Chemicals/VOC",
			"value": `${voc} ppb [ⁱ](https://www.epa.gov/indoor-air-quality-iaq/what-are-volatile-organic-compounds-vocs)`,
			"inline": true
		  }
		]
	  }
}