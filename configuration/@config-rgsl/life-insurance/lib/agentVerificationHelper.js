'use strict';

const list = {
    terrorist: 'Перечень террористов/экстремистов',
    un: 'Перечень ООН',
    mvk: 'Перечень МВК',
    fl281: 'Перечень 281-ФЗ (Перечень контрсанкционных лиц)',
    fl272: 'Перечень 272-ФЗ'
};

const state = {
    Draft: "Черновик",
    Executed: "Выполнено",
    Cancelled: "Отменено"
};

module.exports = {
    list, state
};
