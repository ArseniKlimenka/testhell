'use strict';

const helper = require('@config-rgsl/agent-agreement-base/lib/AAASSHelper');

module.exports = function mappingFunction(input, sinkExchange) {

    const { commonBody } = input;
    const baseCommissionRules = commonBody.rules.filter(rule => rule.commissionType === 'base') || [];

    const sequenceParameters = [];
    const valueSetCount = helper.getMultiValueSetCount(baseCommissionRules);

    sequenceParameters.push({ SequenceName: 'PAS_IMPL.AA_EVAL_ATTR_VALUE', Count: valueSetCount, StartValueOffset: 1000 });

    return {
        parameters: {
            SequenceParameters: sequenceParameters
        }
    };
};
