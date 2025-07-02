'use strict';

module.exports = function beneficiaryRiskResponseMapping(input) {

    if (!input.response.data || input.response.data.length === 0) {

        return [];
    }

    const result = input.response.data.map(item => {

        return {
            value: {
                code: item.resultData.riskCode,
                description: item.resultData.riskShortDescription
            },
            displayName: item.resultData.riskShortDescription
        };
    });

    return result;
};
