const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
require('dotenv').config();
const Sequelize = require('./db');
const UserModel = require('./models');
const locales = require('./locales');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

function getT(msg, user) {
    let lang = 'en';
    if (user && user.language) {
        lang = user.language;
    } else if (msg.from.language_code && locales[msg.from.language_code]) {
        lang = msg.from.language_code;
    }
    return locales[lang];
}

const startGame = async (chatId, t) => {
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, t.tryToGuess , gameOptions);
}

const start = async () => {
    try {
        await Sequelize.authenticate();
        await Sequelize.sync();
        console.log('Connection has been established successfully.\n');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



    bot.setMyCommands([
        { command: '/start', description: 'Start the bot' },
        { command: '/info', description: 'Check points' },
        { command: '/game', description: 'Play a game' },
        { command: '/setnick', description: 'Set your nickname' },
        { command: '/setlang', description: 'Set your language (en/pl/ru)' },
        { command: '/top', description: 'Show top lucky users' }
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            let user = await UserModel.findOne({ where: { chatId } });
            const t = getT(msg, user);

            if (text === '/start') {
                if (!user) {
                    const firstName = msg.from.first_name;
                    const lastName = msg.from.last_name;
                    const username = msg.from.username;

                    user = await UserModel.create({ chatId, firstName, lastName, username });
                }
                await setUserCommands(user.language || 'en', chatId);
                await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp');
                return bot.sendMessage(chatId, t.welcome(msg.from.first_name, msg.from.last_name));
            }

            if (text === '/info') {
                if (!user) {
                    return bot.sendMessage(chatId, t.notRegistered);
                }
                return bot.sendMessage(chatId, t.stats(user));
            }
    
            if (text === '/game') {
                await bot.sendMessage(chatId, t.startGame);
                return startGame(chatId, t);
            }

            if (text.startsWith('/setnick')) {
                const nickname = text.replace('/setnick', '').trim();
                if (!nickname) {
                    return bot.sendMessage(chatId, t.provideNick, { parse_mode: 'Markdown' });
                }
                if (!user) {
                    return bot.sendMessage(chatId, t.notRegistered);
                }
                user.nickname = nickname;
                await user.save();
                return bot.sendMessage(chatId, t.nickSet(nickname));
            }

            if (text.startsWith('/setlang')) {
                const lang = text.replace('/setlang', '').trim().toLowerCase();
                if (!['en', 'pl', 'ru'].includes(lang)) {
                    return bot.sendMessage(chatId, 'Available languages: en, pl, ru\nExample: \`/setlang pl\`', { parse_mode: 'Markdown' });
                }
                if (!user) {
                    return bot.sendMessage(chatId, t.notRegistered);
                }
                user.language = lang;
                await user.save();
                await setUserCommands(lang, chatId);
                const tNew = locales[lang];
                return bot.sendMessage(chatId, tNew.languageSet ? tNew.languageSet(lang) : `Language set to: ${lang}`);
            }

            if (text === '/top') {
                const topUsers = await UserModel.findAll({
                    order: [['points', 'DESC']],
                    limit: 10
                });

                if (!topUsers.length) {
                    return bot.sendMessage(chatId, t.noUsers);
                }
                const medals = ['🥇', '🥈', '🥉'];
                let message = t.topTitle;
                topUsers.forEach((u, i) => {
                    message += `${medals[i] ? medals[i] + ' ' : ''}${i + 1}. ${u.nickname || 'NoNick'} — ${u.points} ${t.points} (${u.right} ${t.rightGuesses})\n`;
                });
                return bot.sendMessage(chatId, message);
            }

            return bot.sendMessage(chatId, t.unknown);
        } catch (e) {
            return bot.sendMessage(chatId, t.error);
        }
        
    });

    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id;
        let user = await UserModel.findOne({ where: { chatId } });
        if (!user) {
            const firstName = msg.from.first_name;
            const lastName = msg.from.last_name;
            const username = msg.from.username;
            user = await UserModel.create({ chatId, firstName, lastName, username });
        }

        const t = getT(msg, user);
        const data = msg.data;

        if (data === '/again') {
            return startGame(chatId, t);
        }

        if (!(chatId in chats)) {
            return bot.sendMessage(chatId, t.again, againOptions(t));
        }
        
        if (data == chats[chatId]) {
            user.right += 1;
            user.points += 3;
            
            await bot.sendMessage(chatId, t.guessed(chats[chatId]), againOptions(t));

            delete chats[chatId];
        } else {
            user.wrong += 1;
            user.points -= 1;

            await bot.sendMessage(chatId, t.notGuessed(chats[chatId]), againOptions(t));

            delete chats[chatId];
        }
        await user.save();
    });
};

async function setUserCommands(lang, userId) {
    const t = locales[lang] || locales['en'];
    await bot.setMyCommands([
        { command: '/start', description: t.commands.start },
        { command: '/info', description: t.commands.info },
        { command: '/game', description: t.commands.game },
        { command: '/setnick', description: t.commands.setnick },
        { command: '/setlang', description: t.commands.setlang },
        { command: '/top', description: t.commands.top }
    ], { language_code: lang, scope: { type: 'chat', chat_id: userId } });
}

start();