'use strict';

const { isManualCorrectionVisible } = require('@config-rgsl/life-insurance/lib/declarationUtils');

module.exports = function showManualCorrection(input, ambientProperties) {

    return isManualCorrectionVisible(input);
};
