const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableAgreement(input, ambientProperties) {

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) {

        return true;
    }

    return input.context.Body.declarationMedicalConfirmationPolicyHolder.isConfirmed;

};
