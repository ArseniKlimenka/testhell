'use strict';

const { beneficiaryReasons } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function beneficiaryLookupOnLoad(input) {

    const context = this.getLookup().getContext().viewContext;

    context.additionalProtectedFields = [
        'partyCodesToInclude',
        'dateOfBirthFrom'
    ];

    context.shoudShowPartyCode = true;
    const reason = input.rowContext?.beneficiaryReason?.code;
    const searchCriteria = {};
    searchCriteria.dateOfBirthFrom = '1000-01-01';

    if (reason === beneficiaryReasons.insuredPerson) {

        const insuredPerson = input.rootContext.Body.tempTechnicalData.policyParties.insuredPerson;

        searchCriteria.partyCodesToInclude = [insuredPerson.personCode];
    }
    else if (reason === beneficiaryReasons.policyHolder) {

        const policyHolderCode = input.rootContext.Body.tempTechnicalData.policyParties.holder.personCode;

        searchCriteria.partyCodesToInclude = [policyHolderCode];
    }
    else {

        const insuredPerson = input.rootContext.Body.tempTechnicalData.policyParties.insuredPerson;
        searchCriteria.code = insuredPerson.personCode;
    }

    this.getLookup().setSearchRequest({
        data: {
            criteria: searchCriteria
        }
    });

    this.getLookup().search();
};
