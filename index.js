const discord = require('discord.js');
const client = new discord.Client;
const weather = require("weather-js");
const Anime = require('malapi').Anime;
const translate = require('google-translate-api');
const randomAnimeWallpapers = require('random-anime-wallpapers');
const getter = require('booru-getter');
var https = require('https');
var http = require('http');
var google = require('google');
const aide = "https://github.com/generalmd2/densetsuno/blob/utilisateur/README.md";
var prefix = "$";
const chanelco = false;
var status = prefix + 'aide';


client.on("ready", () => {
var memberCount = client.users.size;
var servercount = client.guilds.size;
  var servers = client.guilds.array().map(g => g.name).join(',');
  console.log("--------------------------------------");
  console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :smiley:  \n');
  client.user.setGame(status); //Joue à ...
});

client.on('guildMemberAdd', member => {
	member.guild.defaultChannel.sendMessage(`${member.user.username} a rejoins le serveur ${member.guild.name}`);
});

client.on('guildMemberRemove', member => {
	member.guild.defaultChannel.sendMessage(`${member.user.username} a quitté le serveur ${member.guild.name}`);
});

client.on('error', m => console.log('debug', m));
client.on('reconnecting', m => console.log('debug', m));

client.on('message', message => {
	if (message.content.starsWitch(prefix + 'aide')){
		message.channel.sendMessage(aide);
	}
	else if (message.content.starsWitch(prefix + 'avatar')){
		message.reply(message.author.avatarURL);
	}
	else if (message.content.startsWith(prefix + 'météo')){
    var location = message.content.substr(6);
    var unit = "C";
    
    try {
        weather.find({search: location, degreeType: unit}, function(err, data) {
            if(err) {
                console.log(Date.now(), "DANGER", "Je ne peut pas trouvé d'information pour la méteo de " + location);
                message.reply("\n" + "Je ne peux pas trouvé d'information pour la méteo de " + location);
                } else {
                data = data[0];
               console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
               message.reply("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
              }
        });
    } catch(err) {
        console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
        message.reply("Une erreur est survenu, contacter l'administrateur ;) ");
        }
    }
    else if (message.content.startsWith(prefix + 'trad')){
      var traduction = message.content.substr(5);
      translate(traduction, {to: 'fr'}).then(res => {
        message.channel.sendMessage(res.text);
      }).catch(err => {
         console.error(err);
      });
    }
    else if (message.content.startsWith(prefix + 'img')){
		var keyword = message.content.substr(4);
		randomAnimeWallpapers(keyword)
        	.then(images => {
        	message.reply(images[0].full);
        	}
        )   
	}
	else if (message.content.startsWith(prefix + 'ping')){
		message.reply("pong");
	}
	else if (message.content.startsWith(prefix + 'g')){
		google.resultsPerPage = 1;
		var nextCounter = 0;
		google.lang = 'fr';
		google.tld = 'fr';
		var recherchegoogle = message.content.substr(2);
		google(recherchegoogle, function (err, res){
  			if (err) console.error(err)
  			for (var i = 0; i < res.links.length; ++i) {
    			var link = res.links[i];
    			message.channel.sendMessage(link.title + ' - ' + link.href+ "\n" + link.description + "\n");
  			}
  		})
	}
	else if (message.content.startsWith(prefix + 'boru')){
		var gelborry = message.content.substr(5);
		getter.getRandomLewd(gelborry, (url)=>{
   			 message.channel.sendMessage("http:"+url);	
  		})
	}
	else if (message.content.startsWith(prefix + 'join')){
    	const voiceConnection = message.member.voiceConnection;
        const voiceChannel = message.member.voiceChannel;
      	if (!voiceChannel){
        	message.reply("Vous n'êtes pas connecté sur un channel vocal");
      	}else{
        	message.reply("Connexion en cours ...");
        	voiceChannel.join()
        	.then(connection => {
        		message.delete();
              	message.reply('Je suis connecté'); 
              	chanelco = true ;
        	})
        .catch(console.error);
        }
    }
    else if (message.content.startsWith(prefix + 'radio 1')){
    	const voiceConnection = message.member.voiceConnection;
        const voiceChannel = message.member.voiceChannel;
    	if (!voiceChannel){
        	message.reply("Vous n'êtes pas connecté sur un channel vocal");
      	}else{
        	message.reply("Connexion en cours ...");
        	voiceChannel.join()
        	.then(connection => {
				require('http').get('http://streaming.radio.funradio.fr/fun-1-44-96', (res) => {
      			connection.playStream(res);
      			message.channel.sendMessage('Lecture radio : Fun Radio sélectionné !');
        		})
        	.catch(console.error);
        	})
    	}
	}
	else if (message.content.startsWith(prefix + 'radio 2')){
   		const voiceConnection = message.member.voiceConnection;
        const voiceChannel = message.member.voiceChannel;
    	if (!voiceChannel){
        	message.reply("Vous n'êtes pas connecté sur un channel vocal");
      	}else{
        	message.reply("Connexion en cours ...");
        	voiceChannel.join()
        	.then(connection => {
				require('http').get('http://broadcast.infomaniak.ch/radioclassique-high.aac', (res) => {
      			connection.playStream(res);
      			message.channel.sendMessage('Lecture radio : Radio Classique séléctionné !');
        		})
        	.catch(console.error);
        	})
    	}
	}
	else if (message.content.startsWith(prefix + 'radio 2')){
   		const voiceConnection = message.member.voiceConnection;
        const voiceChannel = message.member.voiceChannel;
    	if (!voiceChannel){
        	message.reply("Vous n'êtes pas connecté sur un channel vocal");
      	}else{
        	message.reply("Connexion en cours ...");
        	voiceChannel.join()
        	.then(connection => {
				require('http').get('http://sv2.vestaradio.com/Radio-Animes', (res) => {
      			connection.playStream(res);
      			message.channel.sendMessage('Lecture radio : Radio Anime séléctionné !');
        		})
        	.catch(console.error);
        	})
    	}
	}
	else if (message.content.startsWith(prefix + 'leave')){
    	const voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel){
       		message.reply("Erreur, vous ne pouvez pas leave le bot car vous ne l'avez pas connecté ou vous n'êtes pas connecté aux channel vocal");
      	}else{
        	message.reply("Déconnexion en cours ...");
        	message.member.voiceChannel.leave();
      	}
    }
})
/*
var dt = process.env.DISCORD_TOKEN || process.argv[2];

if (!dt) {
    console.log('Erreur du login');
}

client.login(dt);*/
var token = 'MjcxMzE0NTE0NDEzMDkyODY0.C4CnDg.3IjpOdIjSYAiM9Q6_Th-eZXuS_A';
client.login(token)