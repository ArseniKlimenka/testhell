'use strict';

const participantsUtils = require('@config-rgsl/life-insurance/lib/participantsUtils');
const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");

module.exports = async function beneficiariesOnBeforeGridAction(input, ambientProperties) {

    if (!input.affectedRow.beneficiaryId) {

        input.affectedRow.beneficiaryId = guidHelper.generate();
    }

    return true;
};
