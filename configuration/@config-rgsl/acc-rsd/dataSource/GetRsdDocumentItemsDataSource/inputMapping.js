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
                case 'contractNumber':
                    sortedFieldName = 'CONTRACT_NUMBER';
                    break;
                case 'holderName':
                    sortedFieldName = 'HOLDER_NAME';
                    break;
                case 'itemNo':
                    sortedFieldName = 'ITEM_NO';
                    break;
                case 'dueDate':
                    sortedFieldName = 'DUE_DATE';
                    break;
                case 'openAmount':
                    sortedFieldName = 'OPEN_AMOUNT';
                    break;
                case 'deadlineDate':
                    sortedFieldName = 'DEADLINE_DATE';
                    break;
                case 'overdueDays':
                    sortedFieldName = 'OVERDUE_DAYS';
                    break;
                case 'rsdRate':
                    sortedFieldName = 'RSD_RATE';
                    break;
                case 'rsdAmount':
                    sortedFieldName = 'RSD_AMOUNT';
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
            CONTRACT_NUMBER: 'asc'
        };
    }

    return output;
};
