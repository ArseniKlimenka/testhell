'use strict';

module.exports = function (input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    universalDocumentNumber: input.endowmentNumber,
                }
            }
        }
    };
};
