'use strict';

const { getRiskInsuredSumByPeriod } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function getInsuredSum(input) {

    const risk = input.context.Body.mainAttributes.selectedRisk;

    if (risk) {

        const riskPeriods = input.context.Body.mainAttributes.risksInsuredSumByPeriod.find(item => item.riskCode === risk.riskCode);
        const eventDate = input.context.Body.mainAttributes?.insuredEvent?.insuredEventDate;

        let result = getRiskInsuredSumByPeriod(risk, eventDate, riskPeriods);

        if (result) {

            result = result.toFixed(2);
        }

        return result;
    }
};
