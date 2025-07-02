'use strict';

const {
    updateAllocationButton,
    updateExchangeRatePanel,
    getAllocationExchangeRate,
} = require('@config-rgsl/acc-cash-flow/lib/allocationHelper');

module.exports = async function documentSelectionChanged(input, ambientProperties) {
    const item = input.actionData.parameters;

    const body = input.context.Body;
    const cntDocCurrency = this.view.getControlByElementId('allocationAmountDocCurrency');
    const cachedExchangeRates = input.rootContext.viewContext.exchangeRates;

    if (item) {
        body.document = {
            documentNo: item.documentNo,
            currencyCode: item.currencyCode,
            documentType: item.documentType,
        };

        if (body.bankStatementItem.id) {
            await getAllocationExchangeRate(cachedExchangeRates, body, ambientProperties);
            body.docAmountToAllocate = body.payAmountToAllocate * body.crossRate;
        }

        cntDocCurrency.enableElement();
    }
    else {
        delete body.document;
        cntDocCurrency.disableElement();
    }

    this.view.rebind();

    updateAllocationButton(body, input.context, this.view);
    updateExchangeRatePanel(body, this.view);
};
