'use strict';

module.exports = function applicantLookupOnLoad(input) {

    this.getLookup().getContext().viewContext.additionalProtectedFields = [
        'dateOfBirthFrom'
    ];

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                dateOfBirthFrom: '1000-01-01'
            }
        }
    });

    this.getLookup().search();
};
