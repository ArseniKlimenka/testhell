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
                case 'historyId':
                    sortedFieldName = 'BANK_STATEMENT_ITEM_HISTORY_ID';
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
            BANK_STATEMENT_ITEM_HISTORY_ID: 'asc'
        };
    }

    return output;
};
