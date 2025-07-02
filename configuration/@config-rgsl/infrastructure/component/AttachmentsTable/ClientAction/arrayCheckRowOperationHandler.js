const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * Checks if attachment can be edited and / or deleted.
 */
module.exports = function arrayCheckRowOperationHandler(input, ambientProperties) {

    const confCode = input.rootContext.ConfigurationCodeName;
    const isSystemActor = input.rootContext.WorkUnitActor.CurrentActor == 'System';
    const productCode = input.rootContext.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const issueFormCode = input.rootContext.Body?.issueForm?.code?.issueFormCode;
    const isPaper = issueFormCode == 'paper';
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const isPartyEditorAGENT = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'PartyEditorAGENT');

    const attachmentVisibilityConf = {
        confCode,
        isSystemActor,
        isBackOffice,
        productCode,
        isWCENOAS,
        issueFormCode,
        isPaper,
        isPartyEditorAGENT,
    };

    const parentContext = this.view.getParentView()?.getContext()?.ConfigurationCodeName ?? confCode;
    const isExternalView = confCode !== parentContext;
    const shouldDisableExternalFileEdit = input.rootContext?.ClientViewModel?.shouldDisableExternalFileEdit;
    const shouldDisableExternalFileDelete = input.rootContext?.ClientViewModel?.shouldDisableExternalFileDelete;

    if (isExternalView && (shouldDisableExternalFileEdit || shouldDisableExternalFileDelete)) {

        return {
            edit: !(shouldDisableExternalFileEdit ?? false),
            delete: !(shouldDisableExternalFileDelete ?? false)
        };
    }

    return {
        edit: _canUpdateAttachment(input.affectedRow, attachmentVisibilityConf),
        delete: _canDeleteAttachment(input.affectedRow, attachmentVisibilityConf)
    };
};

/**
 * Check if the specific attachment can be edited.
 *
 * @param {object} originalData - Attachment that we're checking for
 *
 * @returns {boolean} - Whether update should be possible
 */
function _canUpdateAttachment(originalData, attachmentVisibilityConf) {

    disableDeleteUpdateForAttachment(originalData, attachmentVisibilityConf);
    return originalData.isEditable && (originalData.uploadStatus === "Uploaded" || originalData.uploadStatus === "PendingUpload");
}

/**
 * Check if the specific attachment can be deleted.
 *
 * @param {object} originalData - Attachment that we're checking for
 *
 * @returns {boolean} - Whether deletion should be possible
 */
function _canDeleteAttachment(originalData, attachmentVisibilityConf) {

    disableDeleteUpdateForAttachment(originalData, attachmentVisibilityConf);
    return originalData.isDeletable && (originalData.uploadStatus === "Uploaded");
}

function disableDeleteUpdateForAttachment(originalData, attachmentVisibilityConf) {

    const isKIDAttachment = originalData.attachmentType === 'KIDAttachment';
    const isEPolicyAttachment = [
        'memoCB',
        'memoCBDigitallySigned',
        'ePolicy',
        'ePolicyDigitallySigned',
        'servicesMemo'].includes(originalData.attachmentType);
    const isOtherAttachment = ['other'].includes(originalData.attachmentType);
    const isWCENOASOtherAttachment = attachmentVisibilityConf.isWCENOAS && isOtherAttachment;
    const isInvApplicationAttachment = ['InvApplicationAttachment', 'InvApplicationSignedAttachment'].includes(originalData.attachmentType);

    if ((isKIDAttachment || isEPolicyAttachment || isWCENOASOtherAttachment || isInvApplicationAttachment) &&
        !attachmentVisibilityConf.isSystemActor && !attachmentVisibilityConf.isPaper) {

        originalData.isEditable = false;
        originalData.isDeletable = false;
    }

    const isContragent = attachmentVisibilityConf.confCode == 'NaturalPerson' || attachmentVisibilityConf.confCode == 'LegalEntity';
    const currentDate = new Date(new Date().toUTCString()).getTime();
    const lineDate = new Date(originalData.createdOn).getTime();
    const timeDiff = Math.abs(currentDate - lineDate);
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (isContragent && ((daysDiff > 0) && !attachmentVisibilityConf.isBackOffice || attachmentVisibilityConf.isPartyEditorAGENT)) {
        originalData.isDeletable = false;
    }
}
