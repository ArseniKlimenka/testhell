const { getAllocationExchangeRate } = require('@config-rgsl/acc-cash-flow/lib/allocationHelper');

module.exports = async function onChangeDocAmountToAllocate(input, ambientProperties) {
    const body = input.context.Body;

    if (!body.document.documentNo || !body.bankStatementItem.id) {
        return;
    }

    const cachedExchangeRates = input.rootContext.viewContext.exchangeRates;
    await getAllocationExchangeRate(cachedExchangeRates, body, ambientProperties);

    body.payAmountToAllocate = body.docAmountToAllocate / body.crossRate;

    this.view.rebind();
};
