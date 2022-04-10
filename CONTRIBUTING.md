# Contributing to GenuineGenie

Have a killer idea you want to implement in GenuineGenie but don't know where to start?

Fear not! This document will detail the very basics of contributing to GenuineGenie.

GenuineGenie is written in Node.js and uses the extremely popular discord.js library to communicate with discord.

Once you clone this repository, you should find the following directory structure:

[//]: <> (Insert the image of the structure here.)

Here's what each file does, excluding the obvious ones.

Running `deploy.js` collects every slash command that we've coded into the bot and makes the main server (and any development server) recognise each command.

Running `deleteslash.js` contacts the main server (and development servers) and tells it to get rid of every slash command added so far.

`index.js` is the file that should be run when you want to start the bot.

Inside the `commands` folder, you'll find several other folders each denoting a separate category of commands.

You can make your own category - just note that the folder name will have to end with `_commands`.

Within each folder category goes the files for each command GenuineGenie can recognise. In general, it's a good idea to give each command its own file for cleanliness's sake. If you want to add a new command, this is where you'll have to name the file with the name of your command, and begin implementing the logic for it.