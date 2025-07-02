const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { paymentCalculationType } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationConsts');

module.exports = function checkIfRowActionIsAllowed(input, ambientProperties) {
    const disabledTypes = [paymentCalculationType.Account, paymentCalculationType.Penalty];
    const isEquityLifeInsuranceCancellation = ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation;
    const isAccountType = input.affectedRow.paymentLineType === paymentCalculationType.Account;

    if (isEquityLifeInsuranceCancellation) {
        if (isAccountType) {
            return { edit: false };
        }
    } else if (disabledTypes.includes(input.affectedRow.paymentLineType)) {
        return { edit: false };
    }
};
