'use strict';

const {LocalDate} = require('@js-joda/core');

module.exports = function mappingFunction(sinkInput, sinkExchange) {

    const thisYear = LocalDate.now().year();

    return {
        sequenceName: `99-08-421-04.${thisYear}`
    };
};
