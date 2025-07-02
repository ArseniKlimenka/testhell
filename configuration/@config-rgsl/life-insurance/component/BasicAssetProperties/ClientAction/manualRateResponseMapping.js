'use strict';

module.exports = function manualRateResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const resultData = element.resultData;
            const manualRate = resultData.manualRate;

            return {
                value: resultData,
                displayName: `${(manualRate * 100).toFixed(2)}%`
            };
        });
    }

    return output;
};
