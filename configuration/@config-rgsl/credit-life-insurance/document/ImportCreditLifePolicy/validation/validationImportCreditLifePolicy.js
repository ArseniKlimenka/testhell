const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} fileIsRequired
 * @errorCode {errorCode} partnerIsRequired
 * @errorCode {errorCode} initiatorIsRequired
 * @errorCode {errorCode} agentAgreementIsRequired
 */

module.exports = function validationImportCreditLifePolicy(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const fileId = getValue(input, 'file.fileId');
    const partnerCode = getValue(input, 'partner.partnerCode');
    const employeeCode = getValue(input, 'initiator.employeeCode');
    const agentAgreementId = getValue(input, 'agentAgreement.id');

    if (!fileId) {
        validationErrors.push({
            errorCode: "fileIsRequired",
            errorDataPath: dataPath + '/file/fileName'
        });
    }

    if (!partnerCode) {
        validationErrors.push({
            errorCode: "partnerIsRequired",
            errorDataPath: dataPath + '/partner/partnerDescription'
        });
    }

    if (!employeeCode) {
        validationErrors.push({
            errorCode: "initiatorIsRequired",
            errorDataPath: dataPath + '/initiator/partyFullName'
        });
    }

    if (!agentAgreementId) {
        validationErrors.push({
            errorCode: "agentAgreementIsRequired",
            errorDataPath: dataPath + '/agentAgreement/formatedNumber'
        });
    }

    return validationErrors;

};
