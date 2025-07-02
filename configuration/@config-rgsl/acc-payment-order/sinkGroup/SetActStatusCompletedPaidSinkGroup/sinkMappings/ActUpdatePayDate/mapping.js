'use strict';

module.exports = function mapping(input, sinkExchange) {

    const actData = sinkExchange.resolveContext('actData');
    const body = actData.body;
    body.payDate = input.payDate;

    return {
        number: actData.number,
        body: body,
    };
};
