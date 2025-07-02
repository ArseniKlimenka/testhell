const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function enableInitiatorLookup(input, ambientProperties) {

    const isCreatedByOperations = getValue(input, 'context.Body.technicalInformation.isCreatedByOperations', false);
    const isSaveAvailable = isSaveOperationAvailable(this.view);
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isAllowInitiatorChange = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'AllowInitiatorChange');
    const amendmentType = input.context.Dimensions.amendmentType;
    const isInitiatorChangeableAmendment = input.context.Dimensions.amendmentType == changeAmendmentTypes.portfolioMovement;

    return (isAllowInitiatorChange || isCreatedByOperations)
    && isSaveAvailable &&
    !shouldDisableSaveableContract(input, this.view) &&
    (!amendmentType || isInitiatorChangeableAmendment);

};
