const { autoAllocatePayments } = require('@config-rgsl/acc-cash-flow/lib/autoAllocatePayments');

module.exports = async function updatePaymentDescriptionShowDialog(input, ambientProperties) {

    const { context } = input;
    const bsiIds = context.selection.map(_ => _.resultData.bankStatementItemId);
    const result = await showDialog(bsiIds, ambientProperties);
    if (result)
    {
        await autoAllocatePayments(bsiIds, ambientProperties, this.view);
    }

};

/**
 * @uses ClientAction:onLoadPayDescriptionDialog
 */
async function showDialog(bsiIds, ambientProperties) {

    const viewDialogService = ambientProperties.services.viewDialog;

    const inputContext = {
        bankStatementItemIds: bsiIds
    };

    const dialogViewReference = {
        configurationCodeName: 'UpdatePaymentDescriptionView',
        configurationConceptType: 'SearchView',
        configurationVersion: '1'
    };

    const dialogParams = {
        dialogViewReference,
        customData: inputContext,
        dialogSize: 'small',
        onLoad: 'onLoadPayDescriptionDialog'
    };

    const result = await viewDialogService.show(dialogParams);
    return result.success;

}
