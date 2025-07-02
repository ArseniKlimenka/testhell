'use strict';

/**
 * @errorCode {errorCode} fileIsEmpty
 * @errorCode {errorCode} partnerIsEmpty
 * @errorCode {errorCode} insuranceProductIsEmpty
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    if (JSON.stringify(input.file) == JSON.stringify({})) {
        validationErrors.push({
            errorCode: 'fileIsEmpty',
            severity: 'Error',
            errorDataPath: dataPath + '/file/fileName'
        });
    }

    if (JSON.stringify(input.partner) == JSON.stringify({})) {
        validationErrors.push({
            errorCode: 'partnerIsEmpty',
            severity: 'Error',
            errorDataPath: dataPath + '/partner/partnerDescription'
        });
    }

    if (!input.insuranceProduct) {
        validationErrors.push({
            errorCode: 'insuranceProductIsEmpty',
            severity: 'Error',
            errorDataPath: dataPath + '/insuranceProduct'
        });
    }

    return validationErrors;
};
