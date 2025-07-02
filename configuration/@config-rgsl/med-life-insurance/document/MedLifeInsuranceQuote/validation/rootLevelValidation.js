'use strict';

/**
 * @errorCode {errorCode} duplicateGenChkPolicyNumbers
 * */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const duplicateGenChkPolicyNumbers = input?.technicalInformation?.duplicateGenChkPolicyNumbers;

    if (duplicateGenChkPolicyNumbers) {
        validationErrors.push({
            errorCode: 'duplicateGenChkPolicyNumbers',
            errorDataPath: dataPath + '/partyData/partyFullName',
            reference: {
                duplicateGenChkPolicyNumbers: duplicateGenChkPolicyNumbers
            }
        });

    }

    return validationErrors;

};
