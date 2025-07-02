
const { getRiskInsuredSumByPeriod } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function onInsuredEvenDateChanged(input) {

    const selectedRisk = input.context.Body.mainAttributes.selectedRisk;

    if (selectedRisk) {

        const riskPeriods = input.context.Body.mainAttributes.risksInsuredSumByPeriod.find(item => item.riskCode === selectedRisk.riskCode);
        const eventDate = input.context.Body.mainAttributes?.insuredEvent?.insuredEventDate;
        input.context.Body.claimAmounts.requestedClaimAmount = getRiskInsuredSumByPeriod(selectedRisk, eventDate, riskPeriods);
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
