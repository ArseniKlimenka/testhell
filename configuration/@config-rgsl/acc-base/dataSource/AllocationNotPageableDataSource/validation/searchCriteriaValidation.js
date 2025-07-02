/**
 * @errorCode {errorCode} AtLeastOneMandatoryParameter
 */

module.exports = function searchCriteriaValidation(input) {

    const errors = [];

    const atLeastOneRequired = [
        'refDocumentNo',
        'payerName',
        'policyHolderCode',
        'paymentDateFrom',
        'paymentDateTo',
        'policyStartDateFrom',
        'policyStartDateTo',
        'transactionDateFrom',
        'transactionDateTo',
        'payAmountFrom',
        'payAmountTo',
        'bankStatementItemNo',
        'bankStatementItemId',
        'bankStatementItemIds'
    ];

    const noAtLeastOneRequired = !atLeastOneRequired.some(pName => input[pName]);
    if (noAtLeastOneRequired) {
        errors.push({
            errorCode: 'AtLeastOneMandatoryParameter',
            errorMessage: 'You must choose at least one mandatory parameter!',
        });
    }

    return errors;
};
