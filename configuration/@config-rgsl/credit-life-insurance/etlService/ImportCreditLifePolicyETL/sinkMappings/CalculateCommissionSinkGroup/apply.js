const { getCommissionItems } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.calculateCommissionData = sinkResult;

    sinkExchange.commissionItems = getCommissionItems(sinkExchange.calculateCommissionData, sinkExchange.createdPolicyBody);

};
