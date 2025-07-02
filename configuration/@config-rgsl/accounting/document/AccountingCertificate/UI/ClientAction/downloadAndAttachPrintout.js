'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const {
    getAccountingCertificateAttachments,
    dropAttachment, messages, smallSize, largeSize
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

/**
 * @translationKey {translationKey} AttachmentAlreadyExisits
 * @translationKey {translationKey} Create
 * @translationKey {translationKey} Back
 */

module.exports = async function downloadAndAttachPrintout(input, ambientProperties) {

    const translate = ambientProperties.services.translate.getSync;

    const attachments = await getAccountingCertificateAttachments(this.view);

    if (attachments?.length > 0) {

        const message = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.AttachmentAlreadyExisits);
        const create = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.Create);
        const back = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.Back);
        const result = await ambientProperties.services.confirmationDialog.showQuestion(message, create, back, largeSize);

        if (!result) {
            return;
        }

        await dropAttachment(this.view);
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/AccountingCertificateLoadPrintoutToAttachmentsIntegrationService/1',
        data: {
            data: {
                documentId: input.context?.Id,
                documentNo: input.context?.Number,
                state: input.context?.State.Code,
                body: input.context?.Body,
                accountingYear: input.context?.Body?.accountingYear?.year,
                correctionNumber: input.context?.SequenceNumber,
                configurationName: input.context?.ConfigurationCodeName,
                contractNumber: input.context?.Body?.contract.number
            }
        },
        returnFullResponse: true
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
        if (input.context.Number) {

            this.view.reloadEntity();
        }
    }
};
