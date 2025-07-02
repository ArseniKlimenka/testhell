'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {
    await calculateCommissionOnSave(input, ambientProperties);
};
