module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'resultData':
                case 'rsdNumber':
                    sortedFieldName = 'RSD_NUMBER';
                    break;
                case 'rsdAmount':
                    sortedFieldName = 'RSD_AMOUNT';
                    break;
                case 'stateCode':
                case 'stateDescription':
                    sortedFieldName = 'STATE_CODE';
                    break;
                case 'stateChangedOn':
                    sortedFieldName = 'STATE_CHANGED_ON';
                    break;
                case 'stateChangedBy':
                    sortedFieldName = 'STATE_CHANGED_BY';
                    break;
                case 'createdDate':
                    sortedFieldName = 'CREATED_DATE';
                    break;
            }
            if (sortedFieldName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort = output.sort || {};
                output.sort[sortedFieldName] = direction;
            }
        });
    }

    if (!output.sort) {
        output.sort = {
            RSD_NUMBER: 'asc'
        };
    }

    return output;
};
