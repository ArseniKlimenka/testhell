const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { ePolicyAttachmentTypes, offerAttachmentTypes, kidAttachmentTypes } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const attachmentsViewConst = require("@config-rgsl/infrastructure/lib/AttachmentsViewConst");

/**
 * Validates attachments before uploading / editing / deleting them.
 */
module.exports = function preArrayOperationHandler(input, ambientProperties) {
    const {
        affectedRow,
        operationType
    } = input;

    function ISODateString(d) {
        function pad(n) { return n < 10 ? '0' + n : n; }
        return d.getUTCFullYear() + '-'
            + pad(d.getUTCMonth() + 1) + '-'
            + pad(d.getUTCDate());
    }

    if (!affectedRow) {
        return false;
    }

    let body = input.rootContext.Body;

    if (!attachmentsViewConst.polcyAttachmentsConfnames.includes(input.rootContext.ConfigurationCodeName)) {

        body = this.view.getParentView().getContext().Body;
    }

    const issueFormCode = body.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const isOffer = issueFormCode == 'offer';
    const attachmentType = affectedRow?.attachmentType;
    const attachmentsList = affectedRow?.attachments || [];
    const ePolicyAttachments = attachmentsList.filter(item => ePolicyAttachmentTypes.includes(item.attachmentType));
    const offerAttachments = attachmentsList.filter(item => offerAttachmentTypes.includes(item.attachmentType));
    const isSystemActor = input.rootContext.WorkUnitActor.CurrentActor === 'System';
    const attachments = input.data.attachments ?? [];
    const existingAffectedAttachmentType = attachments.find(item => item.attachmentId === affectedRow.attachmentId)?.attachmentType ?? '';

    if (isEPolicy && (ePolicyAttachmentTypes.includes(attachmentType) || ePolicyAttachmentTypes.includes(existingAffectedAttachmentType) || ePolicyAttachments.length > 0) && !isSystemActor) {

        ambientProperties.services.confirmationDialog.showConfirmation('Запрещено вручную манипулировать автогенерируемыми вложениями электрополисов!', 'OK', 'OK', 2);
        return false;
    }

    if (isOffer && (offerAttachmentTypes.includes(attachmentType) || offerAttachments.length > 0)) {

        ambientProperties.services.confirmationDialog.showConfirmation('Запрещено вручную манипулировать автогенерируемыми вложениями электрополисов!', 'OK', 'OK', 2);
        return false;
    }

    if (isEPolicy && (operationType === "Add" || operationType === "Edit")) {

        const addedAttachments = affectedRow?.attachments ?? [];
        const attachmentType = affectedRow?.attachmentType ?? addedAttachments[0]?.attachmentType;
        const exisitingSameAttachment = attachments.find(item => item.attachmentId === affectedRow.attachmentId);
        const exisitingSameTypeAttachment = attachments.find(item => item.attachmentType === attachmentType);

        if ((ePolicyAttachmentTypes.includes(attachmentType) && (exisitingSameTypeAttachment && exisitingSameTypeAttachment !== exisitingSameAttachment)) ||
        kidAttachmentTypes.includes(attachmentType) && attachments.find(item => item.attachmentType === attachmentType)) {

            ambientProperties.services.confirmationDialog.showConfirmation('Указанное вложение может присутствовать только в одном экземпляре!', 'OK', 'OK', 2);
            return false;
        }

    }

    if (operationType === "Add") {
        // Validate attachments before adding them
        const attachments = affectedRow.attachments;

        affectedRow.receiptDate = ISODateString(new Date(affectedRow.receiptDate));

        if (!attachments || attachments.length === 0) {
            return false;
        }

        let valid = true;
        for (let i = 0; i < attachments.length; i++) {
            valid = _isAttachmentValid(attachments[i], ambientProperties);

            if (!valid) {
                return false;
            }
        }
    }
    else if (operationType === "Edit") {
        // Validate the attachment before editing it
        if (affectedRow.Body.isEdit) {
            return _isAttachmentValid(affectedRow, ambientProperties);
        }
        // Validation in case we are adding required attachment(s) through 'edit' shortcut
        const attachments = affectedRow.attachments;

        if (!attachments || attachments.length === 0) {
            return false;
        }

        if (attachments.length != 1) {
            // Only one required attachment can be added this way
            _showWarning('UI_BASE', '##VALIDATE_ADDING_REQUIRED_ATTACHMENT', ambientProperties);

            return false;
        }

        // Validate the attachment before adding it
        return _isAttachmentValid(attachments[0], ambientProperties);

    } else if (operationType === "Delete") {
        affectedRow.uploadStatus = "PendingDeletion";
    }

    return true;
};

/**
 * Validates attachment before uploading / editing it.
 *
 * @param {object} attachment - Attachment for validation
 * @param {object} ambientProperties - Client action's ambient properties
 */
function _isAttachmentValid(attachment, ambientProperties) {
    if (!attachment.attachmentType || !attachment.attachmentName || attachment.uploadStatus === 'UploadPending') {
        // If any of the required properties is missing, show warning and cancel upload
        _showWarning('UI_BASE', '##ATTACHMENT_MISSING_REQUIRED_PROPERTIES', ambientProperties);

        return false;
    }

    if (Date.parse(attachment.receiptDate) > new Date().setHours(23, 59, 59, 999)) {
        // If receipt date is in the future, show warning and cancel upload
        _showWarning('UI_BASE', '##ATTACHMENT_RECEIPT_DATE_IN_THE_FUTURE', ambientProperties);

        return false;
    }

    if (attachment.attachmentName.length > 250) {
        // If attachment name is longer than 250 characters, show warning and cancel uploading
        _showWarning('UI_BASE', '##ATTACHMENT_NAME_EXCEEDS_MAX_LENGTH', ambientProperties);

        return false;
    }

    return true;
}

/**
 * Translates and shows warning.
 *
 * @param {string} translationKey - Warning translation key
 * @param {object} ambientProperties - Client action's ambient properties
 */
function _showWarning(translationBase, translationKey, ambientProperties) {
    const warningText = ambientProperties.services.translate.getSync(translationBase, translationKey);
    ambientProperties.services.confirmationDialog.showWarning(warningText, 'OK', '', 1);
}
