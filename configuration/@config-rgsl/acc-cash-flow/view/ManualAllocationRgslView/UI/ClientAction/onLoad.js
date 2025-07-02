const { allocationToleranceType } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function onLoad(input, ambientProperties) {
    const body = input.context.Body;
    body.toleranceType = allocationToleranceType.STANDARD;
    input.rootContext.viewContext.exchangeRates = [];
    this.view.getControlByElementId('allocationAmountPayCurrency').disableElement();
    this.view.getControlByElementId('allocationAmountDocCurrency').disableElement();

    this.view.getControlByElementId('allocationTabs').selectTab('policyOpenAmountTab');
};
