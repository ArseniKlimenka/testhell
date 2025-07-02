
const creditPremiumCalc = require('@config-rgsl/credit-life-insurance/lib/creditPremiumCalc');
const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');

module.exports = function Premium(input) {

    const { productCode, creditSumNet, creditProgramId, contractIssueDate } = input;
    const risksTariffs = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });

    return creditPremiumCalc.premiumCalculation({ input, risksTariffs });

};
