// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Manager, UseNodeOptions } = require("magmastream");
const { token, clientId, guildId, nodes } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.commands = new Collection();

client.manager = new Manager({
  autoPlay: true, // Optional! - Recommanded to be true
  usePriority: false, // Optional! - Recommanded if you have more than 1 node
  replaceYouTubeCredentials: true, // Optional! - Recommanded to be true
  nodes: [
        {
            host: "127.0.0.1", 
            port: 25794, 
            password: "lavalinkCaioSclavi", 
            secure: false, 
            retryAmount: 500, 
            retryDelay: 300000, 
            resumeStatus: true,
            resumeTimeout: 300
        }
    ],
  send: async (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) await guild.shard.send(payload);
  },
});

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const loadEvents = (folderPath) => {
  // Read all files from the specified folder
  const eventFiles = fs.readdirSync(folderPath);

  for (const file of eventFiles) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    // If it's a directory, recursively load events from it
    if (stat.isDirectory()) {
      loadEvents(filePath);
    } else if (file.endsWith(".js")) {
      // Require the event module
      const event = require(filePath);

      // If the event should be handled only once
      if (event.once) {
        if (filePath.includes(`${path.sep}magmastream${path.sep}`)) {
          // Handle Magmastream events differently
          client.manager.on(event.name, (...args) =>
            event.execute(client, ...args)
          );
        } else {
          // Register a one-time event listener
          client.once(event.name, (...args) => event.execute(client, ...args));
        }
      } else {
        if (filePath.includes(`${path.sep}magmastream${path.sep}`)) {
          // Handle Magmastream events differently
          client.manager.on(event.name, (...args) =>
            event.execute(client, ...args)
          );
        } else {
          // Register a persistent event listener
          client.on(event.name, (...args) => event.execute(client, ...args));
        }
      }
      console.log(`[INFO] Loaded event: ${event.name}`);
    }
  }
};

const eventsPath = path.join(__dirname, "events");
loadEvents(eventsPath);

// Log in to Discord with your client's token
client.login(token);
