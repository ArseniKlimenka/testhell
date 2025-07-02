'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = input.body;
    const riskCode = body.mainAttributes.selectedRisk?.riskCode;
    sinkExchange.selectedRiskCode = riskCode;
    sinkExchange.hasDeathRisk = false;

    return {
        input: {
            data: {
                criteria: {
                    code: riskCode,
                    riskGroup: 'Death'
                }
            }
        }
    };
};
