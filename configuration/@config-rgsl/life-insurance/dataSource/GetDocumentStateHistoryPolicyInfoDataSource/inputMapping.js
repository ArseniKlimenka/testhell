'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            newState: input.data.criteria.newState ? input.data.criteria.newState : undefined,
            transition: input.data.criteria.transition ? input.data.criteria.transition : undefined
        },
        sort: {
            'CHANGED_ON': 'desc'
        }
    };

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            changedOn: 'CHANGED_ON'
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
