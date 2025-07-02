'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {
    deleteExtraProperties(input);
    await calculateCommissionOnSave(input, ambientProperties);
};

const deleteExtraProperties = function (input) {
    delete input.context.Body.beneficiaries;
};
