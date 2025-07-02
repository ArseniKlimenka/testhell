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
                case 'bankStatementItemId':
                    sortedFieldName = 'BANK_STATEMENT_ITEM_ID';
                    break;
                case 'referenceNo':
                    sortedFieldName = 'REFERENCE_NO';
                    break;
                case 'errorCode':
                    sortedFieldName = 'ERROR_CODE';
                    break;
                case 'errorMessage':
                    sortedFieldName = 'ERROR_MESSAGE';
                    break;
                case 'lastUpdated':
                    sortedFieldName = 'LAST_UPDATED';
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
            BANK_STATEMENT_ITEM_ID: 'asc'
        };
    }

    return output;
};
