import * as conf from './Conf';
var Nightmare1 = require('nightmare');
var nightmare = Nightmare1({
    show: false
});

function getTriolanInfo(msg, bot) {
    nightmare
        .goto('https://triolan.name/LP.aspx')
        .wait('#rb1')
        .select('#rb1', '1')
        .wait('#login2_tbAgreement')
        .select('#login2_tbAgreement', conf.TRIOLAN_LOGIN)
        .wait('#login2_tbPassword')
        .select('#login2_tbPassword', conf.TRIOLAN_PASSWORD)
        .click('#login2_btnLoginByAgr')
        .goto('https://triolan.name/Registration.aspx')
        .evaluate(function () {
            return document.querySelector('ul')
                .textContent;
        })
        .end()
        .then(function (page) {
            bot.sendMessage(msg.from.id, page);
        })
}

export default getTriolanInfo;