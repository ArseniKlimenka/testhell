'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsAgentAgreement(input) {

    return basicFilterByColumnName(input, 'agentAgreement');
};
