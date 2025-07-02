'use strict';

module.exports = function mapping(input, sinkExchange) {

    const actData = sinkExchange.resolveContext("actData");

    if (!actData) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentNumber: actData.aaNumber,
                }
            }
        }
    };
};
