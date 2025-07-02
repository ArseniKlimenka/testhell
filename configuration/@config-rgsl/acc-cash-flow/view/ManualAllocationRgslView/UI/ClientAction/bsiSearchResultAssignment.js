'use strict';

const {
    updateAllocationButton,
    updateExchangeRatePanel,
    getAllocationExchangeRate,
} = require('@config-rgsl/acc-cash-flow/lib/allocationHelper');

module.exports = async function bsiSearchResultAssignment(input, ambientProperties) {
    const body = input.context.Body;
    const cachedExchangeRates = input.rootContext.viewContext.exchangeRates;

    const selectedItems = input.getLookupSelection();
    if (selectedItems.length !== 1) {
        throw 'Only one item can be selected';
    }

    const bsi = selectedItems[0].resultData;
    body.bankStatementItem = {
        id: bsi.bankStatementItemId,
        no: bsi.bankStatementItemNo,
        openAmount: bsi.openAmount,
        paymentDate: bsi.paymentDate,
        currencyCode: bsi.currencyCode,
    };

    body.payAmountToAllocate = bsi.openAmount;
    this.view.getControlByElementId('allocationAmountPayCurrency').enableElement();

    if (body.document.documentNo) {
        await getAllocationExchangeRate(cachedExchangeRates, body, ambientProperties);
        body.docAmountToAllocate = body.payAmountToAllocate * body.crossRate;
    }

    this.view.rebind();

    updateAllocationButton(body, input.context, this.view);
    updateExchangeRatePanel(body, this.view);
};
