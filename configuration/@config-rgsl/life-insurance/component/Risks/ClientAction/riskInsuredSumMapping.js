'use strict';

module.exports = function riskInsuredSumMapping(input, ambientProperties) {

    const riskInsuredSum = input.data.riskInsuredSum;
    const riskInsuredSumExists = riskInsuredSum >= 0;
    const riskInsuredSumByPeriod = input.data.riskInsuredSumByPeriod || [];
    const riskInsuredSumByPeriodExists = riskInsuredSumByPeriod && riskInsuredSumByPeriod.length > 0;

    return {
        riskInsuredSumExists,
        riskInsuredSum,
        riskInsuredSumByPeriodExists
    };

};
