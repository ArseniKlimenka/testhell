'use strict';

const { beneficiaryReasons } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function beneficiaryLookupOnLoad(input) {

    this.getLookup().getContext().viewContext.additionalProtectedFields = [
        'partyCodesToInclude',
        'dateOfBirthFrom'
    ];

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

    this.getLookup().setSearchRequest({
        data: {
            criteria: searchCriteria
        },
        paging: {
            page: 0,
            pageSize: 5
        }
    });

    this.getLookup().search();
};
