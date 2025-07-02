const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function executor(step, context, stepContext) {
    const act = context.act;

    const client = new Client();
    const result = await testHelperFuncs.retryValidate(
        async () => callDataSource('PODocumentSearchDataSource', {
            paging: undefined,
            criteria : { referenceNumber: act.number },
        }, client),
        (response) => {
            expect(response.data.length, 'No payment order found!').to.be.equal(1);
        },
        10
    );

    context.paymentOrder = result.data[0].resultData;
}

module.exports = {
    executor,
};
