'use strict';

const defaultSettings = require('@config-rgsl/agent-agreement-base/lib/AAEvalConfiguration');
const dataProviderHelper = require('@config-rgsl/agent-agreement-base/lib/AAEvalDataProviderHelper');

module.exports = function DataSourceInputMapping(input) {

    if (!input || !input.data || !input.data.criteria) {
        throw 'Invalid input parameters!';
    }

    const output = {
        parameters: {
            contractNumbers: input.data.criteria.contractNumbers,
            contractNumbersTmpTable: input.data.criteria.contractNumbersTmpTable,
        }
    };

    const settings = Object.assign(({ useMassColumns: true, massTableAlias: 'c' }), defaultSettings);
    dataProviderHelper.fillDataProviderParameters(output.parameters, ({}), settings);

    return output;
};
