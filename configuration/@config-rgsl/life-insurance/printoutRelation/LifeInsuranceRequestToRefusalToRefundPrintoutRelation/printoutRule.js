'use strict';

const {
    documentStates,
    documentActors
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function rule(input) {

    if (this.businessContext.documentState == documentStates.CancelWithoutPayment &&
        this.applicationContext.actor == documentActors.GeneralBackOffice &&
        input.body.contract.productCode == 'CACB') {

        return true;
    }
};
