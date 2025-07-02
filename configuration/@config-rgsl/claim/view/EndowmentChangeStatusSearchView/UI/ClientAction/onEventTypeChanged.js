module.exports = function onEventTypeChanged(input) {

    input.context.request.data.criteria.eventReason = undefined;
    input.context.request.data.criteria.riskCode = undefined;
};
