const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const path = require('path');

async function createRegistry(step, context, stepContext) {

    const body = {
        file: {
            fileId: undefined,
            fileName: 'test.csv',
        },
        summary: {},
        sourceFileFormat: 7,
    };

    const builder = new VersionedDocumentBuilderRgsl('AggregatedPaymentRegisterImport');
    const document = await builder
        .setExample({ body })
        .setActor(stepContext.actor)
        .create()
        .uploadFile(path.join(__dirname, body.file.fileName),
            {
                fileName: body.file.fileName,
                mediaType: 'text/plain'
            })
        .update((body, ctx) => {
            body.file.fileId = ctx.uploadedFiles[0].FileId;
        })
        .makeTransition('StartLoading')
        .retryValidateGet(
            (ctx) => {
                expect(ctx.documentState).to.be.equals('Imported');
            },
            { retryCount: 4, initialDelay: 500 },
        )
        .setActor(stepContext.actor)
        .update((body, ctx) => {
            body.bankStatementItems = [
                {
                    id: context.bigPayment.id,
                    no: context.bigPayment.no,
                    amount: 100,
                    toleranceType: 1,
                }
            ];
        })
        .makeTransition('Imported_to_Allocation')
        .retryValidateGet(
            (ctx) => {
                expect(ctx.documentState).to.be.equals('Generated');
            },
            { retryCount: 4, initialDelay: 500 },
        )
        .build();

    context.registry = {
        number: document.documentNumber,
        id: document.id,
    };
    console.log('Registry created: ' + JSON.stringify(context.registry));
}

module.exports = {
    createRegistry,
};
