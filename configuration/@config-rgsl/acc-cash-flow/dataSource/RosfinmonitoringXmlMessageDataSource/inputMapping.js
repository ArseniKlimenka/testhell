'use strict';

const { bankStatementItemStatusId, bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function DataSourceInputMapping(input) {

    if (!input?.data?.criteria) {
        throw "Input criteria was not defined!";
    }

    const criteria = input.data.criteria;

    if (!criteria.bankStatementItemId) {
        throw "Criteria must have additional parameters!";
    }

    const output = {
        parameters: {
            ...criteria,
        }
    };

    return output;
};
