'use strict';

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function contractSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        this.view.startBlockingUI();

        input.data.Body.mainAttributes.contract = {};
        input.data.Body.mainAttributes.contract.number = lookupSelection[0].resultData.number;
        input.data.Body.mainAttributes.contract.configurationName = lookupSelection[0].metadata.configurationName;
        input.data.Body.mainAttributes.availableRisks = lookupSelection[0].resultData.items[0].attributes.risks;
        input.data.Body.mainAttributes.selectedRisk = undefined;

        const docCurrency = lookupSelection[0].resultData.items[0].attributes.currency;
        const exchangeRate = await exchangeRateLookup([], docCurrency, currency.localCurrency, ambientProperties, dateUtils.dateNow());

        input.data.Body.claimAmounts.contractCurrency = docCurrency;
        input.data.Body.claimAmounts.exchangeRate = exchangeRate;

        this.view.stopBlockingUI();
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
