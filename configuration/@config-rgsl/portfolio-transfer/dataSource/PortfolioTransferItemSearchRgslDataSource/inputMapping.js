module.exports = function DataSourceInputMapping(input) {

    if (!input || !input.data || !input.data.criteria) {

        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            ...input.data.criteria
        }
    };

    if (input.data.criteria.productDescription) {

        output.parameters.productDescription = `%${input.data.criteria.productDescription}%`;
    }

    if (input.data.criteria.userName) {

        output.parameters.userName = `%${input.data.criteria.userName}%`;
    }

    if (input.data.criteria.holderName) {

        output.parameters.holderName = `%${input.data.criteria.holderName}%`;
    }

    if (input.data.criteria.documentNoStr) {

        let documentNo = input.data.criteria.documentNo;

        if (!input.data.criteria.documentNo) {

            documentNo = input.data.criteria.documentNo = [];
        }

        const parsed = input.data.criteria.documentNoStr.split(/(?:\r\n|\r|\n)/g);

        documentNo.push(...parsed);
    }

    if (input.data.criteria.documentNo) {

        output.parameters.documentNo = input.data.criteria.documentNo;
    }

    if (input.data.criteria.contractNumbersStr) {

        let contractNumbers = input.data.criteria.contractNumbers;

        if (!input.data.criteria.contractNumbers) {

            contractNumbers = input.data.criteria.contractNumbers = [];
        }

        const parsed = input.data.criteria.contractNumbersStr.split(/(?:\r\n|\r|\n)/g);
        contractNumbers.push(...parsed);
    }

    if (input.data.sort) {

        const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();

        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'referenceNo':
                    sortedFieldName = 'CONTRACT_NUMBER';
                    break;
                case 'startDate':
                    sortedFieldName = 'START_DATE';
                    break;
                case 'holderName':
                    sortedFieldName = 'HOLDER_NAME';
                    break;
                case 'dueDate':
                    sortedFieldName = 'DUE_DATE';
                    break;
                case 'stateCode':
                    sortedFieldName = 'CONTRACT_STATE';
                    break;
                case 'productDescription':
                    sortedFieldName = 'PRODUCT_DESC';
                    break;
                case 'transferState':
                    sortedFieldName = 'TRANSFER_STATE';
                    break;
                case 'documentNo':
                    sortedFieldName = 'PORTFOLIO_TRANSFER_NUMBER';
                    break;
                case 'issueDate':
                    sortedFieldName = 'ISSUE_DATE';
                    break;
                case 'serviceProviderNameFrom':
                    sortedFieldName = 'SERVICE_PROVIDER_NAME_FROM';
                    break;
                case 'serviceProviderNameTo':
                    sortedFieldName = 'SERVICE_PROVIDER_NAME_TO';
                    break;
                case 'userName':
                    sortedFieldName = 'USERNAME';
                    break;
                case 'configurationName':
                    sortedFieldName = 'CODE_NAME';
                    break;
                default:
                    sortedFieldName = camelToSnakeCase(element.fieldName);
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
