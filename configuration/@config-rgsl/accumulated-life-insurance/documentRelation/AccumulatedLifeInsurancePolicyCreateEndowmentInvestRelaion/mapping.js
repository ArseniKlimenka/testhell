'use strict';

const { getDefaultEndowmentBody } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { investmentEventType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(body) {
    const { configurationCodeName, documentNumber } = this.businessContext;
    const result = getDefaultEndowmentBody(body, investmentEventType, configurationCodeName, documentNumber);
    return { body: result };
};
