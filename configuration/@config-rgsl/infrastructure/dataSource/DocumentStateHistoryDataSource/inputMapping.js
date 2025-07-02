module.exports = function (input) {

    const output = {
        parameters: {
            entityId: input.data.criteria.entityId ? input.data.criteria.entityId : undefined,
            documentCode: input.data.criteria.documentCode ? input.data.criteria.documentCode : undefined
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
