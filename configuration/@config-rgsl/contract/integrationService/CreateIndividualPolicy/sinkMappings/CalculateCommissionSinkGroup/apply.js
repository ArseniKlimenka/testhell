const { getCommissionItems } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const createdPolicyBody = sinkExchange.resolveContext('createdPolicyBody');
    const commissionItems = getCommissionItems(sinkResult, createdPolicyBody);

    sinkExchange.mapContext('calculateCommissionData', sinkResult);
    sinkExchange.mapContext('commissionItems', commissionItems);
};
