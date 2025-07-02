module.exports = function(input) {
    const output = {
        parameters: {
            bankStatementItemId: input.data.criteria.bankStatementItemId
        }
    };

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'referenceNo':
                    sortedFieldName = 'REFERENCE_NO';
                    break;
                case 'allocationMessage':
                    sortedFieldName = 'AUTO_ALLOCATION_MESSAGE';
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
            IS_ERROR: 'desc'
        };
    }

    return output;
};
