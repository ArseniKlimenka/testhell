'use strict';

module.exports = function fetchMapping(sinkInput, sinkExchange) {

    const isin = sinkInput.isin;

    return {
        input: {
            data: {
                criteria: {
                    isin: isin,
                }
            }
        }
    };
};
