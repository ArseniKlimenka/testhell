'use strict';

module.exports = function fetchMapping(dataSourceInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    rgslGuid: dataSourceInput.guid,
                    skipReloading: true,
                }
            }
        }
    };
};
