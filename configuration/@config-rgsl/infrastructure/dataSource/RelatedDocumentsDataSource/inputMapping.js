'use strict';

module.exports = function (input) {
    const output = {
        parameters: {
            documentId: null,
            documentNumber: null,
            requestNumber: null
        }
    };

    if (input.data.criteria.documentId) {
        output.parameters.documentId = input.data.criteria.documentId;
    }

    if (input.data.criteria.documentNumber) {
        output.parameters.documentNumber = input.data.criteria.documentNumber;
    }

    if (input.data.criteria.requestNumber) {
        output.parameters.requestNumber = input.data.criteria.requestNumber;
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            createdOn: 'CREATED_ON'
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
