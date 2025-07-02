
const { getRiskInsuredSumByPeriod } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { injuryRisks, riskCalcualtionTypes } = require('@config-rgsl/claim-base/lib/claimConsts');
const { claimRisksRules } = require('@config-rgsl/claim-base/lib/ClaimRisksRules');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function calculateRiskRuleBasedDefaultAmounts(input) {

    const selectedRisk = input.context.Body.mainAttributes.selectedRisk;
    const policyProduct = input.context.Body.tempTechnicalData?.policyProduct;
    const disabilityGroup = input.context.Body.mainAttributes?.riskAdditionalAttributes?.disabilityGroup;

    if (!selectedRisk || !policyProduct || injuryRisks.includes(selectedRisk.riskCode)) {

        return;
    }

    const riskConf = claimRisksRules({ riskCode: selectedRisk.riskCode, productCode: policyProduct, disabilityGroup });

    if (!riskConf?.calcualtionType) {

        return;
    }

    const calcValues = riskConf.strictCalcValues ?? [];
    const dataSchemaValues = riskConf.calcValuesPath ?? [];

    dataSchemaValues.forEach(item => {

        const value = getValue(input.context.Body, item);

        if (value) {

            calcValues.push(value);
        }
    });

    if (riskConf.useRiskInsuredSum) {

        const riskPeriods = input.context.Body.mainAttributes.risksInsuredSumByPeriod
            .find(item => item.riskCode === selectedRisk.riskCode);
        const eventDate = input.context.Body.mainAttributes.insuredEvent?.insuredEventDate;
        const riskSum = getRiskInsuredSumByPeriod(selectedRisk, eventDate, riskPeriods);

        if (riskSum) {

            calcValues.push(riskSum);
        }
    }

    let result = undefined;

    if (calcValues.length > 0) {

        switch (riskConf.calcualtionType) {
            case riskCalcualtionTypes.coefficient:
                result = calcValues.reduce((a, b) => a * b);
                break;
            case riskCalcualtionTypes.singleValue:
                result = calcValues[0];
                break;
            default:
                break;
        }
    }

    if (result) {

        result = round(result);
        const amontInLocalCurrency = round(result * input.context.Body.claimAmounts.exchangeRate);

        delete input.context.Body.claimAmounts.paymentPercentage;
        input.context.Body.claimAmounts.requestedClaimAmount = result;
        input.context.Body.claimAmounts.paymentAmountInDocCurrency = result;
        input.context.Body.claimAmounts.paymentAmountInRubCurrency = amontInLocalCurrency;
        input.context.Body.claimAmounts.rznu = result;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
