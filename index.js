const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};
const startGame = async (chatId) => {
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Try to guess', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Start the bot' },
        { command: '/info', description: 'Get user name and surname' },
        { command: '/game', description: 'Play a game' }
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp');
            return bot.sendMessage(chatId, `Hello, ${msg.from.first_name} ${msg.from.last_name},\nWelcome to this awesome bot`);
        }
    
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`);
        }

        if (text === '/game') {
            await bot.sendMessage(chatId, 'I will mind number from 0 to 9, try to guess it');
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'I do not understand you, please try again.');
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations, you guessed the number ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `Sorry, you did not guess, I thought of the number ${chats[chatId]}`, againOptions);
        }
    });
};

start();