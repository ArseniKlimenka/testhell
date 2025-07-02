'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            number: undefined,
            relatedClaimNumber: undefined,
            relatedUniDocNumber: undefined,
            anyMatchNumber: undefined,
        }
    };

    if (input.data.criteria.number) {
        output.parameters.number = input.data.criteria.number;
    }

    if (input.data.criteria.relatedClaimNumber) {
        output.parameters.relatedClaimNumber = input.data.criteria.relatedClaimNumber;
    }

    if (input.data.criteria.relatedUniDocNumber) {
        output.parameters.relatedUniDocNumber = input.data.criteria.relatedUniDocNumber;
    }

    if (input.data.criteria.relatedUniVersDocNumber) {
        output.parameters.relatedUniVersDocNumber = input.data.criteria.relatedUniVersDocNumber;
    }

    if (input.data.criteria.relatedUniMECode) {
        output.parameters.relatedUniMECode = input.data.criteria.relatedUniMECode;
    }

    if (input.data.criteria.anyMatchNumber) {
        output.parameters.anyMatchNumber = input.data.criteria.anyMatchNumber;
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            errorDate: 'ERROR_DATE'
        };

        input.data.sort.forEach(element => {
            const dbName = columnNames[element.fieldName];

            if (dbName) {
                output.sort[dbName] = element.descending ? 'desc' : 'asc';
            }
        });
    }

    return output;
};
