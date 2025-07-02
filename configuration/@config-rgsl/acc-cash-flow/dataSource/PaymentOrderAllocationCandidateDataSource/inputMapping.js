module.exports = function DataSourceInputMapping(input) {
    const output = {
        parameters: {
        }
    };

    if (input.data.criteria) {
        output.parameters = { ...input.data.criteria };
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'resultData':
                case 'documentNo':
                    sortedFieldName = 'DOCUMENT_NO';
                    break;
                case 'poDate':
                    sortedFieldName = 'PAYMENT_ORDER_DATE';
                    break;
                case 'recipientName':
                    sortedFieldName = 'RECIPIENT_NAME';
                    break;
                case 'debtAmount':
                    sortedFieldName = 'DEBT_AMOUNT';
                    break;
                case 'openDebtAmount':
                    sortedFieldName = 'OPEN_DEBT_AMOUNT';
                    break;
                case 'currencyCode':
                    sortedFieldName = 'CURRENCY_CODE';
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
            DOCUMENT_NO: 'asc'
        };
    }

    return output;
};
