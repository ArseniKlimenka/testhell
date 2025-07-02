'use strict';

module.exports = function docNumberShowAsRequired(input) {

    const isInCreditContractReportsView = input.rootContext?.ConfigurationCodeName == "CreditContractReportsView";

    if (isInCreditContractReportsView) {
        return true;
    }
    return false;
};
