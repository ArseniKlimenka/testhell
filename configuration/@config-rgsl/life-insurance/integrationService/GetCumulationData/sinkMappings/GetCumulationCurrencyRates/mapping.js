'use strict';

module.exports = function mapInput(input, sinkExchange) {

    const currentDate = input.currentDate;

    return {
        input: {
            data: {
                criteria: {
                    currentDate
                }
            }
        }
    };
};
