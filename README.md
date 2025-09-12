# Telegram Number Guessing Bot

A simple Telegram bot built with [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) that lets users play a number guessing game and compete in a lucky users championship.

## Features

- `/start` — Greets the user and sends a welcome sticker.
- `/info` — Shows your first and last name, nickname, and stats.
- `/game` — Starts a game where the bot thinks of a number from 0 to 9, and you try to guess it.
- `/setnick <nickname>` — Set your nickname to participate in the lucky users championship.
- `/top` — Shows the leaderboard of the luckiest users.
- Inline keyboard for guessing and replaying the game.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A Telegram bot token ([How to get one?](https://core.telegram.org/bots#6-botfather))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pavelkhmara/telegram-bot-nodejs.git
   cd telegram-bot-nodejs
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory and add your bot token and database config:**
   ```
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
   DB_NAME=your_db
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. **Start the bot:**
   ```sh
   npm start
   ```

## Usage

- Open Telegram and find your bot.
- Use `/start` to begin.
- Use `/setnick <nickname>` to set your nickname for the championship.
- Use `/game` to play the number guessing game.
- Use `/top` to see the leaderboard.

## Project Structure

```
.
├── index.js
├── options.js
├── .env
├── .gitignore
└── package.json
```

## License

MIT

---

Made with ❤️ using Node.js and Telegram