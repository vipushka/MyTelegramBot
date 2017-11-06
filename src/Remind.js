// @flow
import type PMQuery from './Types';
import * as constants from './Constants';
import * as util from "util";

var dateFormat = require('dateformat');
var bot = null;
var notes = [];

function setBot(myBot) {
    bot = myBot;
}

function startRemind({chat, text}: PMQuery) {
    if (bot != null) {
        var userId = chat.id;
        var res = text.match(/^\/remind (.+)$/i)[1]
        var time = 0;
        notes.push({'uid': userId, 'time': time, 'text': res, 'event': 'remind'});
        bot.sendMessage(chat.id, constants.REMIND, constants.OPTIONS);
    }
}

function returnChoseTimeForRemind(msg) {
    if (bot != null) {
        var answer = msg.data.split('_');
        var res = answer[0];
        var curDate = new Date();
        var stopTime = dateFormat(addMinutes(curDate, Number(res)), 'HH:MM')
        for (var i = 0; i < notes.length; i++) {
            if (notes[i]['uid'] == msg.from.id) {
                notes[i]['time'] = stopTime;
            }
        }
        var message = util.format(constants.REMIND_ANSWER, dateFormat(curDate, 'HH:MM'), stopTime);
        bot.sendMessage(msg.from.id, message);
    }
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

setInterval(function () {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i]['event'] == 'remind' && bot != null) {
            var curDate = dateFormat(new Date(), 'HH:MM');
            if (notes[i]['time'] == curDate) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.');
                notes.splice(i, 1);
            }
        }
    }
}, 1000);

export {setBot, startRemind, returnChoseTimeForRemind};