import { Telegraf } from "telegraf";
import { exec, spawn } from "child_process";
import dotenv from "dotenv";
import { text } from "stream/consumers";

const shell = spawn("zsh");
let bashResult = "";

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if(stdout === "") resolve("No output, but ok");
            resolve(stdout);
        });
        }
    );
}

dotenv.config();
console.log(process.env.BOT_TOKEN);

const bot = new Telegraf(process.env.BOT_TOKEN);



bot.on('text', (ctx) => {
    if (ctx.message.text.toString().includes("bringfile")) {
        const command = ctx.message.text.toString().split(" ");
        sendFile(command[1]);
    } else {

        runCommand(ctx.message.text).then((result) => {
            ctx.reply(result);
        }).catch((error) => {
            ctx.reply(error);
        });
    }
});



const sendMessage = (messageToSend) => {
    bot.telegram.sendMessage("1957890723",  `${messageToSend}`);
}

const sendFile = (fileToSend) => {
    bot.telegram.sendDocument("1957890723", {source: fileToSend});
}


bot.launch(). then(() => {
    console.log("Bot is started");
    sendMessage();


})