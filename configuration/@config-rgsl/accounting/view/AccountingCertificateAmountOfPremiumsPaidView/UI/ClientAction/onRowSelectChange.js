'use strict';

module.exports = function onRowSelectChange(input, ambientProperties) {

    const selectionSum = input.actionData?.selection?.source?._selection?.reduce((accumulator, i) => accumulator + i.resultData.amountLifeRub, 0) ?? undefined;
    input.rootContext.Body.paymentContract.amountOfPremiumsPaid = selectionSum;

    this.view.getParentView().setDirty();

};
