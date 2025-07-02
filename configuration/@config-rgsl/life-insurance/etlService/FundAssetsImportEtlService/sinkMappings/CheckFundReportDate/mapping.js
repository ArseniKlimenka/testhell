'use strict';

module.exports = function mapping(input, sinkExchange) {

    const reportDate = input.data?.reportDate;

    return {
        input: {
            data: {
                criteria: {
                    reportDate: reportDate
                }
            }
        }
    };
};
