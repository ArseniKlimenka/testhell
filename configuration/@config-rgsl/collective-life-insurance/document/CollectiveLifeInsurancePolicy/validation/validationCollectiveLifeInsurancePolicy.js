const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { validationByRole } = require('@config-rgsl/party/lib/partyValidationByRole');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
 * @errorCode {errorCode} premiumCalculatingRequired
 */

module.exports = function validationCollectiveLifeInsurancePolicy(input) {

    const validationErrors = [];

    const body = this.businessContext.rootData;

    const collectivePolicyPremiumWasCalculated = getValue(body, 'technicalInformation.collectivePolicyPremiumWasCalculated', false);

    if (!collectivePolicyPremiumWasCalculated) {
        validationErrors.push({
            errorCode: "premiumCalculatingRequired"
        });
    }

    const policyHolderPartyType = getValue(body, 'policyHolder.partyData.partyType');
    const policyHolderData = getValue(body, 'policyHolder.partyData.partyBody');
    const policyHolderCode = policyHolderPartyType == 'LegalEntity' ? configValidationByRole.PolicyHolderLegalEntity.code : configValidationByRole.PolicyHolderNaturalPerson.code;
    validationByRole(policyHolderCode, policyHolderCode, policyHolderData, validationErrors);

    return validationErrors;
};
