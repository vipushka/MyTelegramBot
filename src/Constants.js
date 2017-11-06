export const HELP = 'Привет, я Бот,\n' +
    '/remind Напоминалка 1-15ть мин\n'+
    'example:\n         /remind позвонить жене\n'+
    '/espStatus Показывает температуру, влажность,\n                      состояние света в комнате\n'+
    '/espLigtOn Включить свет\n'+
    '/espLightOff Выключить свет'
;

export const REMIND = 'Через какое время напомнить?:'

export const OPTIONS = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1 мин', callback_data: '1'}],
            [{text: '5 мин', callback_data: '5'}],
            [{text: '10 мин', callback_data: '10'}],
            [{text: '15 мин', callback_data: '15'}]
        ]
    })
};

export const REMIND_ANSWER = 'Сейчас: %s\nОтлично! Я обязательно напомню в : %s мин.';

export const ESPERROR = 'Ошибка получения данных с устройства';