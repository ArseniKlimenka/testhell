
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

/**
 * @translationKey {translationKey} SelectedAmountNotEqualTotalAmount
 */

module.exports = async function bsiSearchResultAssignment(input, ambientProperties) {
    const body = input.data.Body;
    const selectedItems = input.getLookupSelection();

    const selectedAmount = selectedItems.reduce((acc, v) => round(acc + v.resultData.amount), 0);
    const totalAmount = input?.context?.Body?.summary?.totalPaymentAmount;

    const amountFailed = ambientProperties.currentWorkUnitActor === 'EmployeeUFO' ? selectedAmount <= totalAmount : selectedAmount !== totalAmount;
    if (amountFailed) {
        const message = await ambientProperties.services.translate.get(ambientProperties.configurationCodeName.toUpperCase() + '.SelectedAmountNotEqualTotalAmount');
        ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
        return;
    }

    body.bankStatementItems = selectedItems.map(_ => ({
        id: _.resultData.bankStatementItemId,
        no: _.resultData.bankStatementItemNo,
        amount: _.resultData.amount,
        toleranceType: _.resultData.toleranceType,
    }));

    input.context.ClientViewModel.bankStatementItemNos = body.bankStatementItems.map(_ => _.no);
};
