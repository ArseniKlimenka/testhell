'use strict';

module.exports = function mapping(input, sinkExchange) {
    if (input.oldState !== 'Draft') {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentNoStr: input.number,
                }
            }
        }
    };
};
