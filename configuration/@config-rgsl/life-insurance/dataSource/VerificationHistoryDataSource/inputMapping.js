module.exports = function(input) {
    const output = {
        parameters: {
            verificationNumber: input.data.criteria.verificationNumber
        }
    };

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'verificationStatus':
                    sortedFieldName = 'STATE';
                    break;
                case 'verificationErrors':
                    sortedFieldName = 'VERIFICATION_ERRORS';
                    break;
                case 'comments':
                    sortedFieldName = 'COMMENTS';
                    break;
                case 'createdDate':
                    sortedFieldName = 'LOAD_DATE';
                    break;
                case 'username':
                    sortedFieldName = 'OPERATIONS_USERNAME';
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
            LOAD_DATE: 'desc'
        };
    }

    return output;
};
