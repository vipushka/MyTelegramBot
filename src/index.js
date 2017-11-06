//npm init
//npm install babel-cli babel-register babel-preset-es2015 babel-preset-stage-2 --save-dev
//npm install az --save-dev
//npm install --save-dev babel-plugin-transform-flow-strip-types
//npm install babel-plugin-syntax-flow --save-dev
//npm install --save-dev node-telegram-bot-api

// @flow
import Az from 'az';
import MyTelegramBot from './MyTelegramBot';


process.title = 'MyTelegramBot';
const bot = new MyTelegramBot();
Az.Morph.init(() => bot.run());



