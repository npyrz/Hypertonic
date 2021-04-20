const fs = require('fs').promises;
const path = require('path');

async function registerEvents(bot, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory())
            registerEvents(bot, path.join(dir, file));
        else {

            if (file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    bot.on(eventName, eventModule.bind(null, bot));
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}
module.exports = {
    registerEvents,
};