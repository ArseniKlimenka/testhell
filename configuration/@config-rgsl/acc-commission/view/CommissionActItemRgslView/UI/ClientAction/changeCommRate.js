'use strict';

/**
 * @translationKey {translationKey} AtLeastOneItemMustBeSelected
 */

module.exports = async function changeCommRate(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;
    const selection = input.context.selection;
    const lastUpdated = input.rootContext.Body.lastUpdated;

    if (selection?.length == 0) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AtLeastOneItemMustBeSelected', "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }

    const items = selection.map(_ => _.resultData);
    await showDialog(items, lastUpdated, ambientProperties);
};

/**
 * @uses ClientAction:hideDialogButtons
 */
async function showDialog(actItems, lastUpdated, ambientProperties) {
    const viewDialogService = ambientProperties.services.viewDialog;

    let actItemIds = [];
    actItems.forEach(_ => {
        actItemIds = actItemIds.concat(_.actItemIds);
    });

    const commonLcBaseAmount =
        actItems.every(_ => _.paymentLcAmount === actItems[0].paymentLcAmount) ?
            actItems[0].paymentLcAmount :
            undefined;
    const commonCommRateManual =
        actItems.every(_ => _.commRateManual === actItems[0].commRateManual) ?
            actItems[0].commRateManual :
            undefined;
    const commonCommRate =
        actItems.every(_ => (_.docCommRate || _.aaCommRate) === (actItems[0].docCommRate || actItems[0].aaCommRate)) ?
            (actItems[0].docCommRate || actItems[0].aaCommRate) :
            undefined;
    const commonLcCommAmountManual =
        actItems.every(_ => _.lcCommAmountManual === actItems[0].lcCommAmountManual) ?
            actItems[0].lcCommAmountManual :
            undefined;
    const commonLcCommAmount =
        actItems.every(_ => _.lcCommAmountCalc === actItems[0].lcCommAmountCalc) ?
            actItems[0].lcCommAmountCalc :
            undefined;

    const customData = {
        actItemIds: actItemIds,
        lastUpdated: lastUpdated,

        lcBaseAmount: commonLcBaseAmount,
        commRateManual: commonCommRateManual,
        commRate: commonCommRate,
        lcCommAmountManual: commonLcCommAmountManual,
        lcCommAmount: commonLcCommAmount,
    };

    const dialogViewReference = {
        configurationCodeName: 'UpdateActItemCommRateView',
        configurationConceptType: 'SearchView',
        configurationVersion: '1'
    };

    const dialogParams = {
        dialogViewReference,
        customData,
        dialogSize: 'small',
        onLoad: 'hideDialogButtons',
    };

    await viewDialogService.show(dialogParams);
}
