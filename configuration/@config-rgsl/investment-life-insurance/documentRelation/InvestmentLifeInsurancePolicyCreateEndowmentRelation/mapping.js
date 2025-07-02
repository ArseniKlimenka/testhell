'use strict';

const { getDefaultEndowmentBody } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentEventType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(body) {
    const { configurationCodeName, documentNumber } = this.businessContext;
    const result = getDefaultEndowmentBody(body, endowmentEventType, configurationCodeName, documentNumber);
    return { body: result };
};
