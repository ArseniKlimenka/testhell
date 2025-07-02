const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');

async function createInquiry(inquiryConfiguration, body) {
    const builder = new VersionedDocumentBuilderRgsl(inquiryConfiguration);
    const document = await builder
        .setExample({ body })
        .setActor('InquiryManager')
        .create()
        .waitActivitiyStatusExtension('Draft', true)
        .update(_ => {
            _.textOfAnswer = 'Okay!';
        })
        .makeTransition('DraftIssued', 'Issued')
        .build();

    return document;
}

module.exports = {
    createInquiry,
};
