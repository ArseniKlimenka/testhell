const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function validateSmallPayments(step, context, stepContext) {

    const client = new Client();
    const smallPayments = await testHelperFuncs.retryValidate(
        async () => callDataSource('BankStatementItemDatabaseDataSource', {
            paging: undefined,
            criteria : { registryReferenceNo: context.registry.number },
        }, client),
        (response) => {
            expect(response.data.length, 'wrong payment count').to.be.equal(1);
        },
        7
    );

    context.smallPayments = smallPayments.data.map(_ => _.resultData);
}

module.exports = {
    validateSmallPayments,
};
