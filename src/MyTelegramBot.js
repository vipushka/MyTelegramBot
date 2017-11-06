// @flow
import TelegramBot from 'node-telegram-bot-api';
import * as conf from './Conf';
import {startRemind, returnChoseTimeForRemind, setBot} from "./Remind";
import sendHelp from "./Help";
import getInfoFromDeviceByUrl from "./Esp8266GetData";

class MyTelegramBot {
    bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(conf.TELEGRAM_TOKEN, {polling: true});
    }

    run() {
        this.bot.on('callback_query', (msg) => returnChoseTimeForRemind(msg));
        this.bot.onText(/^\/help$/i, (msg) => sendHelp(msg, this.bot));
        this.bot.onText(/^\/remind (.+)$/i, (query) => {setBot(this.bot); startRemind(query)});
        this.bot.onText(/^\/espStatus$/i, (msg) => getInfoFromDeviceByUrl('http://192.168.1.136/gpio/status',msg,this.bot));
        this.bot.onText(/^\/espLigtOn$/i, (msg) => getInfoFromDeviceByUrl('http://192.168.1.136/gpio/1',msg,this.bot));
        this.bot.onText(/^\/espLightOff$/i, (msg) => getInfoFromDeviceByUrl('http://192.168.1.136/gpio/0',msg,this.bot));
    }
}

export default MyTelegramBot;