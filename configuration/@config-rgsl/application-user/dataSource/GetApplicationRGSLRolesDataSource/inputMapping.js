const { localDateTimeAsString } = require('@config-system/infrastructure/lib/DateUtilsCore');

module.exports = function (input) {
    const output = {
        parameters: {
            codeName: null,
            date: localDateTimeAsString()
        }
    };

    if (input.data.criteria.codeName) {
        output.parameters.codeName = '%' + input.data.criteria.codeName + '%';
    }

    if (input.data.criteria.date) {
        output.parameters.date = input.data.criteria.date;
    }

    if (input.data.sort) {
        output.sort = {};
        input.data.sort.forEach(element => {
            let dbName = '';
            const fieldName = element.fieldName;
            switch (fieldName) {
                case 'codeName':
                    dbName = 'CODE_NAME';
                    break;
            }
            if (dbName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort[dbName] = direction;
            }
        });
    }

    return output;
};
