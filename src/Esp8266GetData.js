const http = require('http');
const jsdom = require("jsdom");
import * as constants from './Constants';
const {JSDOM} = jsdom;

function getInfoFromDeviceByUrl(url, msg, bot) {
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const dom = new JSDOM(data);
            var resultStr = dom.window.document.getElementById('diodStatusLabel').textContent + '\n' +
                dom.window.document.getElementById('ds18b20_1Label').textContent + '\n' +
                dom.window.document.getElementById('ds18b20_2Label').textContent + '\n' +
                dom.window.document.getElementById('dht11Label').textContent;
            bot.sendMessage(msg.from.id, resultStr);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        bot.sendMessage(msg.from.id, constants.ESPERROR);
    });
}

export default getInfoFromDeviceByUrl;