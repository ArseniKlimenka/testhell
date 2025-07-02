'use strict';

module.exports = function docSeriesShowAsRequired(input) {

    const isInCreditContractReportsView = input.rootContext?.ConfigurationCodeName == "CreditContractReportsView";

    if (isInCreditContractReportsView) {
        return true;
    }
    return false;
};
