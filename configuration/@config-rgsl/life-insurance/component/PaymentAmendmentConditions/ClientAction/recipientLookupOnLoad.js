'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function recipientLookupOnLoad(input) {

    this.getLookup().getContext().viewContext.additionalProtectedFields = [
        'partyCodesToInclude',
        'dateOfBirthFrom'
    ];

    const reason = getValue(input, 'rowContext.recipientReason.code');
    const searchCriteria = {};
    searchCriteria.dateOfBirthFrom = '1000-01-01';

    if (reason === amendmentConstants.cancellationRecipientReasons.insuredPerson) {

        const insuredPersonCode = input.rootContext.Body.technicalData.policyParties.insuredPerson.personCode;

        searchCriteria.partyCodesToInclude = [insuredPersonCode];
    }
    else if (reason === amendmentConstants.cancellationRecipientReasons.policyHolder) {

        const policyHolderCode = input.rootContext.Body.technicalData.policyParties.holder.personCode;

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
