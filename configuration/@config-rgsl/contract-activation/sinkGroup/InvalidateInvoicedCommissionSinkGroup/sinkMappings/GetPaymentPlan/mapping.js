'use strict';

module.exports = function mapping(input, sinkExchange) {
    const actItems = sinkExchange.resolveContext('actItems');
    const contractNumbers = [...new Set(actItems.map(_ => _.referenceNo))];

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers,
                }
            }
        }
    };
};
