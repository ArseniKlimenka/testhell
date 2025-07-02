const attachments = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const { accountingCertificateAttachmentTypes } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

async function issueAcAmendment(step, context, stepContext) {

    const builder = new VersionedDocumentBuilderRgsl('AccountingCertificateCorrection');
    const document = await builder
        .getDocumentByNumber(context.integrationServiceResult.Number)
        .setActor(stepContext.actor)
        .uploadAttachment(attachments.getTextAttachment(accountingCertificateAttachmentTypes.taxDeductionCertificate))
        .makeTransition('Draft_to_Checked')
        .build();
}

module.exports = {
    issueAcAmendment,
};
