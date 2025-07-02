'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            partyCode: null
        }
    };

    if (input.data.criteria.partyCode) {
        output.parameters.partyCode = input.data.criteria.partyCode;
    }

    if (!output.parameters.partyCode) {
        throw 'No criteria provided!';
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            sysUpdatedOn: 'sys_updated_on',
            taxResidence: 'tax_residence',
            sysUpdatedBy: 'sys_updated_by'
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
