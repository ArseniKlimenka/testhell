const { Exception } = require("handlebars");

module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw 'Invalid input parameters!';
    }

    const userRoles = this.applicationContext.user.applicationRoles;
    const isSMGO = userRoles.some(x => x == 'SMGO');
    const pageSize = input?.paging?.pageSize;
    if (!isSMGO) {
        if (!pageSize) {
            throw new Exception('Необходимо указать количество возвращаемых записей на странице!');
        }
        if (pageSize > 15) {
            throw new Exception('Превышено количество возвращаемых записей!');
        }
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (output.parameters.isNotCancelled != undefined) {
        output.parameters.fetchCancellations = !output.parameters.isNotCancelled;
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'resultData':
                case 'allocationId':
                    sortedFieldName = 'ALLOCATION_ID';
                    break;
                case 'allocationDate':
                    sortedFieldName = 'ALLOCATION_DATE';
                    break;
                case 'refDocumentNo':
                    sortedFieldName = 'DOCUMENT_NO';
                    break;
                case 'policyStartDate':
                    sortedFieldName = 'POLICY_START_DATE';
                    break;
                case 'dueDate':
                    sortedFieldName = 'DUE_DATE';
                    break;
                case 'installmentAmount':
                    sortedFieldName = 'INSTALLMENT_AMOUNT';
                    break;
                case 'installmentOpenAmount':
                    sortedFieldName = 'INSTALLMENT_OPEN_AMOUNT';
                    break;
                case 'installmentStatus':
                    sortedFieldName = 'INSTALLMENT_STATUS';
                    break;
                case 'payStatus':
                    sortedFieldName = 'PAY_STATUS_ID';
                    break;
                case 'product':
                    sortedFieldName = 'PRODUCT_DESC';
                    break;
                case 'policyHolder':
                    sortedFieldName = 'POLICY_HOLDER_NAME';
                    break;
                case 'transactionDate':
                    sortedFieldName = 'TRANSACTION_DATE';
                    break;
                case 'paymentDate':
                    sortedFieldName = 'PAYMENT_DATE';
                    break;
                case 'payAmount':
                    sortedFieldName = 'PAY_AMOUNT';
                    break;
                case 'docAmount':
                    sortedFieldName = 'DOC_AMOUNT';
                    break;
                case 'exchangeDifference':
                    sortedFieldName = 'EXCHANGE_DIFFERENCE';
                    break;
                case 'payCurrencyCode':
                    sortedFieldName = 'PAY_CURRENCY_CODE';
                    break;
                case 'toleranceOverpayment':
                    sortedFieldName = 'TOLERANCE_OVERPAYMENT';
                    break;
                case 'toleranceUnderpayment':
                    sortedFieldName = 'TOLERANCE_UNDERPAYMENT';
                    break;
                case 'payerName':
                    sortedFieldName = 'PAYER_NAME';
                    break;
                case 'bsiId':
                    sortedFieldName = 'BANK_STATEMENT_ITEM_ID';
                    break;
                case 'bsiNo':
                    sortedFieldName = 'BANK_STATEMENT_ITEM_NO';
                    break;
                case 'bsiDescription':
                    sortedFieldName = 'PAYMENT_DESCRIPTION';
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
            ALLOCATION_ID: 'asc'
        };
    }

    return output;
};
