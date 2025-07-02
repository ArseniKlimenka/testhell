module.exports = function onLoadDocument(input, ambientProperties) {
    const customData = this.view.getCustomData();
    const body = input.context.Body;

    body.actItemIds = customData.actItemIds;
    body.lastUpdated = customData.lastUpdated;
    body.lcBaseAmount = customData.lcBaseAmount;
    body.commRateManual = customData.commRateManual;
    body.commRate = customData.commRate;
    body.lcCommAmountManual = customData.lcCommAmountManual;
    body.lcCommAmount = customData.lcCommAmount;
};
