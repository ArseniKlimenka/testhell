'use strict';

module.exports = function guaranteedIncomeResponseMapping(input) {

    let output = [];

    if (input.response?.data?.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }

    return output;
};
