
const { getRiskInsuredSumByPeriod, setClaimPaymentLines } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { risksCodes, injuryRisks, anyReasonDisabilityRisks } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function onSelectedRiskChanged(input) {

    const selectedRisk = input.context.Body.mainAttributes.selectedRisk;
    const paymentPercentage = input.context.Body.claimAmounts?.paymentPercentage;

    setClaimPaymentLines(input.context.Body);

    if (paymentPercentage) {

        delete input.context.Body.claimAmounts.paymentPercentage;
    }

    if (selectedRisk) {

        if (!injuryRisks.includes(selectedRisk.riskCode)) {

            input.context.Body.claimAmounts.paymentPercentage = 1;
        }
        else {

            const riskPeriods = input.context.Body.mainAttributes.risksInsuredSumByPeriod.find(item => item.riskCode === selectedRisk.riskCode);
            const eventDate = input.context.Body.mainAttributes.insuredEvent.insuredEventDate;
            input.context.Body.claimAmounts.requestedClaimAmount = getRiskInsuredSumByPeriod(selectedRisk, eventDate, riskPeriods);
        }
    }

    const injuries = input.context.Body.mainAttributes?.riskAdditionalAttributes?.injuries ?? [];

    if ((!selectedRisk || !injuryRisks.includes(selectedRisk.riskCode)) && injuries.length > 0) {

        injuries.length = 0;

        const injuriesNotes = input.context.Body.tempTechnicalData?.injuriesNotes;

        if (injuriesNotes) {

            delete input.context.Body.tempTechnicalData.injuriesNotes;
        }

    }

    const numberOfPaidDays = input.context.Body.mainAttributes?.riskAdditionalAttributes?.numberOfPaidDays;

    if ((!selectedRisk || selectedRisk.riskCode !== risksCodes.jobLoss) && numberOfPaidDays) {

        delete input.context.Body.mainAttributes.riskAdditionalAttributes.numberOfPaidDays;
    }

    const disabilityGroup = input.context.Body.mainAttributes?.riskAdditionalAttributes?.disabilityGroup;

    if ((!selectedRisk || !anyReasonDisabilityRisks.includes(selectedRisk.riskCode) ||
        selectedRisk.riskCode !== risksCodes.disabilityByAccident) &&
        disabilityGroup) {

        delete input.context.Body.mainAttributes.riskAdditionalAttributes.disabilityGroup;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
