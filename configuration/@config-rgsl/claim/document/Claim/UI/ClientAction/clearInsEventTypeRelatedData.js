
module.exports = function clearInsEventTypeRelatedData(input, ambientProperties) {

    delete input.context.Body.mainAttributes.insuredEvent.insuredEventReason;
};
