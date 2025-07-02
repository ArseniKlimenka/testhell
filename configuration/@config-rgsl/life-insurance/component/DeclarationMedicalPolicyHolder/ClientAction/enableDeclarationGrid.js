'use strict';

const { isManualCorrectionVisible } = require('@config-rgsl/life-insurance/lib/declarationUtils');

module.exports = function enableDeclarationGrid(input, ambientProperties) {

    const manualCorrection = input.data.declarationMedicalConfirmationPolicyHolder?.manualCorrection;
    return isManualCorrectionVisible(input) && manualCorrection;
};
