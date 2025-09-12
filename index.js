const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
require('dotenv').config();
const Sequelize = require('./db');
const UserModel = require('./models');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};
const startGame = async (chatId) => {
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Try to guess', gameOptions);
}

const start = async () => {
    try {
        await Sequelize.authenticate();
        await Sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



    bot.setMyCommands([
        { command: '/start', description: 'Start the bot' },
        { command: '/info', description: 'Check points' },
        { command: '/game', description: 'Play a game' },
        { command: '/setnick', description: 'Set your nickname' },
        { command: '/top', description: 'Show top lucky users' }
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            const user = await UserModel.findOne({ chatId });
            if (text === '/start') {
                if (!user) {
                    const firstName = msg.from.first_name;
                    const lastName = msg.from.last_name;
                    const username = msg.from.username;

                    await UserModel.create({ chatId, firstName, lastName, username });
                }
                await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp');
                return bot.sendMessage(chatId, `Hello, ${msg.from.first_name} ${msg.from.last_name},\nWelcome to this awesome bot`);
            }
        
            if (text === '/info') {
                if (!user) {
                    return bot.sendMessage(chatId, 'You are not registered');
                }
                return bot.sendMessage(chatId, `${user.nickname ? user.nickname + '\n' : ''}` +
                    `You have guessed right ${user.right} times` +
                    `\nYour points: ${user.points}`
                );
            }
    
            if (text === '/game') {
                await bot.sendMessage(chatId, 'I will mind number from 0 to 9, try to guess it');
                return startGame(chatId);
            }

            if (text.startsWith('/setnick')) {
                const nickname = text.replace('/setnick', '').trim();
                if (!nickname) {
                    return bot.sendMessage(chatId, 'Please provide a nickname. Example: /setnick LuckyJoe');
                }
                if (!user) {
                    return bot.sendMessage(chatId, 'You are not registered');
                }
                user.nickname = nickname;
                await user.save();
                return bot.sendMessage(chatId, `Your nickname is set to: ${nickname}`);
            }
    
            if (text === '/top') {
                const topUsers = await UserModel.findAll({
                    order: [['points', 'DESC']],
                    limit: 10
                });
                if (!topUsers.length) {
                    return bot.sendMessage(chatId, 'No users in the leaderboard yet.');
                }
                let message = '🏆 Top Lucky Users:\n\n';
                topUsers.forEach((u, i) => {
                    message += `${i + 1}. ${u.nickname || 'NoNick'} — ${u.right} right guesses\n`;
                });
                return bot.sendMessage(chatId, message);
            }

            return bot.sendMessage(chatId, 'I do not understand you, please try again.');
        } catch (e) {
            return bot.sendMessage(chatId, 'Sorry :( Error occurred');
        }
    
        
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        const user = await UserModel.findOne({ chatId });
        if (!user) {
            const firstName = msg.from.first_name;
            const lastName = msg.from.last_name;
            const username = msg.from.username;

            await UserModel.create({ chatId, firstName, lastName, username });
        }

        if (data === '/again') {
            return startGame(chatId);
        }

        if (!(chatId in chats)) {
            return bot.sendMessage(chatId, 'This round is already over. Start a new game with /game.', againOptions);
        }
        
        if (data == chats[chatId]) {
            user.right += 1;
            user.points += 1;
            
            await bot.sendMessage(chatId, `Congratulations, you guessed the number ${chats[chatId]}`, againOptions);

            delete chats[chatId];
        } else {
            user.wrong += 1;
            user.points -= 1;

            await bot.sendMessage(chatId, `Sorry, you did not guess, I thought of the number ${chats[chatId]}`, againOptions);

            delete chats[chatId];
        }
        await user.save();
    });
};

start();