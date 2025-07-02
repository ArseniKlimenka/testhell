'use strict';

/**
 * @errorCode {errorCode} isContainsDeathRisk
 */

module.exports = function validateDocument(input) {

    const validationErrors = [];

    const body = this.businessContext.rootData;

    if (body.selectedClaimRisks?.some(item => item?.selectedRisk?.risksGroup === 'Death')) {

        validationErrors.push({
            errorCode: 'isContainsDeathRisk',
            severity: 'Note'
        });
    }

    return validationErrors;
};
