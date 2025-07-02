'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    input.deduplicationInfo = dataSourceResponse.data.map(_ => _.resultData);
};
