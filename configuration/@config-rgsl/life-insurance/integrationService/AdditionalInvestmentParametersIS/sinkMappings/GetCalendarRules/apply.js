'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult || sinkResult.length == 0) {
        this.stopExecution(`Рабочий календарь не найден или данные в нём отсутствуют.`);
    }

    sinkExchange.workCalendarWithIsWork = sinkResult ?? [];

};
