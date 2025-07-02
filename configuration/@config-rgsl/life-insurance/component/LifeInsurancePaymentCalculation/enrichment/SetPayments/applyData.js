'use strict';
const { getPaymentLines, calculateTax } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationHelper');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, result) {

    const body = this.businessContext.rootData;
    const isEquityLifeInsuranceCancellation = this.businessContext.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation;

    if (isEquityLifeInsuranceCancellation) {
        const taxLine = body.paymentCalculation.paymentLines.find(item => item.paymentLineType === 'Tax');
        result.taxValue = taxLine.paymentLineSum;
    } else {
        const { netAssetsAmount, riskPremium } = result;
        const tax = calculateTax(riskPremium, netAssetsAmount);

        result.taxValue = tax < 0 ? 0 : tax;
    }

    body.paymentCalculation.paymentLines = getPaymentLines(result);
    body.paymentCalculation.fundStatus = result.fundStatus;
};
