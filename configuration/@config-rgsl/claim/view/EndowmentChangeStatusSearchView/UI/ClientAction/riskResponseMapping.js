'use strict';

module.exports = function riskResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const result = {};
            result.displayName = element.resultData.riskShortDescription;
            result.value = element.resultData.riskCode;
            return result;
        });
    }

    return output;
};
