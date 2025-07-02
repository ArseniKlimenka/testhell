'use strict';

module.exports = function fetchMapping(dataSourceInput, sinkExchange) {
    const guidAlreadyExists = sinkExchange.resolveContext("guidAlreadyExists");
    if (guidAlreadyExists === true) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    id: dataSourceInput.currencyId,
                }
            }
        }
    };
};
