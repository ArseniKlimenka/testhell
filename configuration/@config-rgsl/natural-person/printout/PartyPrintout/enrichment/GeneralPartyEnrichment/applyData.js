'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    input.userFIO = dataSourceResponse.data[0].resultData.displayName;
};
