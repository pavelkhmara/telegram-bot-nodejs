# Telegram Number Guessing Bot

A simple Telegram bot built with [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) that lets users play a number guessing game.

## Features

- `/start` — Greets the user and sends a welcome sticker.
- `/info` — Shows the user's first and last name.
- `/game` — Starts a game where the bot thinks of a number from 0 to 9, and the user tries to guess it.
- Inline keyboard for guessing and replaying the game.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A Telegram bot token ([How to get one?](https://core.telegram.org/bots#6-botfather))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   

2. **Install dependencies:**
   ```sh
   npm install

3. **Create a .env file in the root directory and add your bot token:**
   ```sh
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here

4. **Start the bot:**
```sh
  npm start

### Usage
Open Telegram and find your bot.
Use /start to begin.
Use /game to play the number guessing game.

### Project Structure
.
├── [index.js](http://_vscodecontentref_/1)
├── [options.js](http://_vscodecontentref_/2)
├── .env
├── .gitignore
└── [package.json](http://_vscodecontentref_/3)

### License
MIT

Made with ❤️ using Node.js and Telegram Bot API