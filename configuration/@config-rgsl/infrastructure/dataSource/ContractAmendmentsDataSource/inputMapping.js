'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;
    if (!criteria) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            contractId: undefined
        }
    };

    output.parameters.contractId = criteria.contractId;

    if (!output.parameters.contractId) {
        throw 'No criteria provided!';
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            sysCreatedOn: 'sys_created_on'
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
