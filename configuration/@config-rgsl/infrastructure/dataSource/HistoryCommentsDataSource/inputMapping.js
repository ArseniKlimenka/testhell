'use strict';

module.exports = function DataSourceInputMapping(input) {

    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            origDocumentNumber: null,
            requestNumber: null
        }
    };

    if (input.data.criteria.origDocumentNumber) {

        output.parameters.origDocumentNumber = input.data.criteria.origDocumentNumber;
    }

    if (input.data.criteria.userGroup) {

        output.parameters.userGroup = input.data.criteria.userGroup;
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
