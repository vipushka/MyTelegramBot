// @flow
import type {Chat, PMQuery, InlineQuery} from './Types';
import * as constants from './Constants';

function sendHelp(msg, bot) {
    bot.sendMessage(msg.from.id, constants.HELP);
}

export default sendHelp;
