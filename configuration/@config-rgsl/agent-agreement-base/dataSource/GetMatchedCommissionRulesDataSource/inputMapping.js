'use strict';

const dataProviderHelper = require('@config-rgsl/agent-agreement-base/lib/AAEvalDataProviderHelper');

module.exports = function (input) {

    const output = {};

    if (!input.data.criteria.calculationContext.manualRule) {
        input.data.criteria.calculationContext.manualRule = null;
    }

    output.parameters = dataProviderHelper.fillDataProviderParameters(
        {
            originDocumentNumber: input.data.criteria.originDocumentNumber,
            calculationDate: input.data.criteria.calculationDate
        },
        input.data.criteria.calculationContext);

    return output;
};
