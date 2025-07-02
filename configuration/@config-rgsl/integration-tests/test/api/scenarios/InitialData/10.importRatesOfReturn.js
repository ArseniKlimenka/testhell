const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const path = require('path');

async function importRatesOfReturn(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const body = {
        file: {
            fileId: undefined,
            fileName: 'rateOfReturnRules.xlsx',
        },
        summary: {},
        sourceFileFormat: 1,
    };

    const builder = new VersionedDocumentBuilderRgsl('RateOfReturnRulesImport');
    const document = await builder
        .setExample({ body })
        .setActor(stepContext.actor)
        .create()
        .uploadFile(path.join(__dirname, body.file.fileName),
            {
                fileName: body.file.fileName,
                mediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
        .update((body, ctx) => {
            body.file.fileId = ctx.uploadedFiles[0].FileId;
        })
        .makeTransition('StartLoading')
        .retryValidateGet(
            (ctx) => {
                expect(ctx.documentState).to.be.equals('Imported');
            },
            { retryCount: 6 * 10, initialDelay: 10000 },
        )
        .build();

}

module.exports = {
    importRatesOfReturn,
};
