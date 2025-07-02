const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

async function getAllocationExchangeRate(cachedExchangeRates, body, ambientProperties) {

    const payCurrency = body.bankStatementItem.currencyCode;
    const docCurrency = body.document.currencyCode;

    body.exchangeRateDate = body.bankStatementItem.paymentDate;
    body.crossRate = await exchangeRateLookup(cachedExchangeRates, payCurrency, docCurrency, ambientProperties, body.exchangeRateDate);
}

function updateAllocationButton(body, context, view) {
    const button = view.getControlByElementId('allocationButtonId');
    const currentActor = context.WorkUnitActor.CurrentActor;

    if (body.document?.documentNo &&
        body.bankStatementItem?.id &&
        !isNaN(body.docAmountToAllocate) &&
        currentActor === actorConstants.CHIEF_PAYMENT_DISTRIBUTOR) {
        button.enableElement();
    }
    else {
        button.disableElement();
    }
}

function updateExchangeRatePanel(body, view) {
    const rateLabel = view.getControlByElementId('exchangeRateDateId');
    const rateDateLabel = view.getControlByElementId('crossRateId');
    if (body.crossRate && body.crossRate !== 1) {
        rateLabel.showElement();
        rateDateLabel.showElement();
    } else {
        rateLabel.hideElement();
        rateDateLabel.hideElement();
    }
}

module.exports = {
    getAllocationExchangeRate,
    updateAllocationButton,
    updateExchangeRatePanel,
};
