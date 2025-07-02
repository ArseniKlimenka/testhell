/**
 * Sets filter parameters and gets attachments.
 *
 * @param {Object} view - Current view
 * @param {Object} input - The view's data
 */
async function refreshAttachments(view, input) {
    view.startBlockingUI('FRAMEWORK.##LOADING');
    const response = await view.getParentView().attachmentManager.getAttachments({ parameters: { params: prepareRetrievalParams(input) } });
    fillTableData(view, input, response);
}

async function getCurrentAttachments(attachmentManager, input) {

    const result = await attachmentManager.getAttachments({ parameters: { params: prepareRetrievalParams(input) } });
    return result;
}

/**
 * Prepare additional parameters for retrieving / downloading attachments.
 *
 * @param {Object} input - The view's data
 * @returns {Object} - Parameters for retrieving / downloading attachments
 */
function prepareRetrievalParams(input) {
    if (input.context.Body.showFilters) {
        const sequenceNumber = '0';

        return {
            SequenceNumber: sequenceNumber,
            IncludePreviousAttachments: true
        };
    }
    return {
        SequenceNumber: null,
        IncludePreviousAttachments: false,
    };

}

/**
 * Maps attachments to table fields.
 *
 * @param {Object} view - Current view
 * @param {Object} input - The view's data
 * @param {Array} attachments - Attachments to map
 */
function fillTableData(view, input, attachments) {

    /**
     * Converts number to a logical/code name of the upload status.
     *
     * @param {number} uploadStatusNumber - Upload status numeric value.
     *
     * @returns {string} - Status code name
     */
    function _getUploadStatusString(uploadStatusNumber) {
        switch (uploadStatusNumber) {
            case 1:
                return 'PendingUpload';
            case 2:
                return 'Uploaded';
            case 3:
                return 'PendingDeletion';
            case 4:
                return 'Deleted';
            default:
                return undefined;
        }
    }

    if (attachments) {
        input.context.Body.attachments.length = 0;

        // We convert each attachment and add it to the array.
        attachments.forEach((attachment) => {

            // RGSL server has MSK time, so we'll have wrong time, but they correct...
            const createdOnLocal = new Date(new Date(attachment.CreatedOn).getTime() - 3 * 60 * 60 * 1000).toISOString();

            const mappedAttachment = {
                attachmentId: attachment.AttachmentId,
                attachmentType: attachment.AttachmentType.Code,
                attachmentTypeName: attachment.AttachmentTypeName,
                attachmentName: attachment.Name,
                receiptDate: attachment.ReceiptDate,
                description: attachment.AttachmentDescription,
                uploadStatus: _getUploadStatusString(attachment.UploadStatus),
                downloadUrl: attachment.DownloadUrl,
                isEditable: attachment.IsEditable,
                isDeletable: attachment.IsDeletable,
                isRequired: attachment.Required,
                flow: attachment.Flow,
                createdOn: createdOnLocal,
                createdBy: attachment.CreatedBy,
                updatedOn: attachment.UpdatedOn,
                updatedBy: attachment.UpdatedBy,
            };

            input.context.Body.attachments.push(mappedAttachment);
        });
    }

    view.rebind();
    view.stopBlockingUI();
}

module.exports = {
    refreshAttachments: refreshAttachments,
    getCurrentAttachments: getCurrentAttachments
};
