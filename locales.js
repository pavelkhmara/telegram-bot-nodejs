const { error } = require("console");

module.exports = {
    en: {
        welcome: (first, last='') => `Hello, ${first} ${last},\nWelcome to this awesome bot`,
        notRegistered: 'You are not registered',
        tryToGuess: 'Try to guess',
        guessed: num => `Congratulations, you guessed the number ${num}`,
        notGuessed: num => `Sorry, you did not guess, I thought of the number ${num}`,
        again: 'This round is already over. Start a new game with /game.',
        provideNick: 'Please provide a nickname. Example: \`/setnick LuckyJoe\`',
        nickSet: nick => `Your nickname is set to: ${nick}`,
        noUsers: 'No users in the leaderboard yet.',
        topTitle: '🏆 Top Lucky Users:\n\n',
        unknown: 'I do not understand you, please try again.',
        stats: (user) => `${user.nickname ? user.nickname + '\n' : ''}You have guessed right ${user.right} times\nYour points: ${user.points}`,
        startGame: 'I will mind number from 0 to 9, try to guess it',
        points: 'points',
        rightGuesses: 'right guesses',
        error: 'Sorry :( Error occurred',
        playAgain: 'Play again',
        languageSet: (lang) => `Language set to: ${lang}`,
        commands: {
            start: 'Start the bot',
            info: 'Check points',
            game: 'Play a game',
            setnick: 'Set your nickname',
            setlang: 'Set your language',
            top: 'Show top lucky users'
        }
    },
    ru: {
        welcome: (first, last='') => `Привет, ${first} ${last},\nДобро пожаловать в этого бота!`,
        notRegistered: 'Вы не зарегистрированы',
        tryToGuess: 'Попробуйте угадать',
        guessed: num => `Поздравляем, вы угадали число ${num}`,
        notGuessed: num => `К сожалению, вы не угадали, я загадал число ${num}`,
        again: 'Раунд уже завершён. Начните новую игру с /game.',
        provideNick: 'Пожалуйста, укажите ник. Пример: \`/setnick LuckyJoe\`',
        nickSet: nick => `Ваш ник установлен: ${nick}`,
        noUsers: 'В таблице лидеров пока нет пользователей.',
        topTitle: '🏆 Самые везучие пользователи:\n\n',
        unknown: 'Я вас не понимаю, попробуйте ещё раз.',
        stats: (user) => `${user.nickname ? user.nickname + '\n' : ''}Вы угадали ${user.right} раз(а)\nВаши очки: ${user.points}`,
        startGame: 'Я загадаю число от 0 до 9, попробуйте угадать',
        points: 'очков',
        rightGuesses: 'правильных угадываний',
        error: 'Извините :( Произошла ошибка',
        playAgain: 'Играть снова',
        languageSet: (lang) => `Язык установлен: ${lang}`,
        commands: {
            start: 'Запустить бота',
            info: 'Показать очки',
            game: 'Играть',
            setnick: 'Установить никнейм',
            setlang: 'Выбрать язык',
            top: 'Показать самых везучих'
        }
    },
    pl: {
        welcome: (first, last='') => `Cześć, ${first} ${last},\nWitamy w tym niesamowitym bocie`,
        notRegistered: 'Nie jesteś zarejestrowany',
        tryToGuess: 'Spróbuj zgadnąć',
        guessed: num => `Gratulacje, zgadłeś liczbę ${num}`,
        notGuessed: num => `Niestety nie zgadłeś, pomyślałem o liczbie ${num}`,
        again: 'Ta runda już się zakończyła. Rozpocznij nową grę za pomocą /game.',
        provideNick: 'Proszę podać pseudonim. Przykład: \`/setnick LuckyJoe\`',
        nickSet: nick => `Twój pseudonim to: ${nick}`,
        noUsers: 'Brak użytkowników w rankingu.',
        topTitle: '🏆 Farciarze :\n\n',
        unknown: 'Nie rozumiem cię, spróbuj ponownie.',
        stats: (user) => `${user.nickname ? user.nickname + '\n' : ''}Zgadłeś poprawnie ${user.right} razy\nTwoje punkty: ${user.points}`,
        startGame: 'Wymyślę liczbę od 0 do 9, spróbuj ją zgadnąć',
        points: 'punktów',
        rightGuesses: 'trafnych zgadnięć',
        error: 'Przepraszam :( Wystąpił błąd',
        playAgain: 'Zagraj ponownie',
        languageSet: (lang) => `Język ustawiony na: ${lang}`,
        commands: {
            start: 'Uruchom bota',
            info: 'Sprawdź punkty',
            game: 'Zagraj',
            setnick: 'Ustaw swój pseudonim',
            setlang: 'Ustaw swój język',
            top: 'Pokaż top użytkowników'
        }
    }
};