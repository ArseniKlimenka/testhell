const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function onDocNettedAmountChanged(input, ambientProperties) {

    if (input.data.nettedAmount) {

        input.data.nettedAmountInDocCurrency = round(input.data.nettedAmount * input.data.exchangeRate);
    }
};
