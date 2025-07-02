'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertIC(step, context, stepContext) {

    const expectedCount = stepContext.expected.invoicedCommission.length;
    const criteria = {
        contractNumber: context.contractNumber,
    };

    const client = new Client();
    let invoicedCommission;
    await testHelperFuncs.retryValidate(
        async () => callDataSource('InvoicedCommissionDataSource', {
            paging: undefined,
            criteria,
        }, client),
        (response) => {
            invoicedCommission = response.data.map(_ => _.resultData);
            expect(invoicedCommission.length).to.equal(expectedCount, 'Wrong IC count');
        },
    );

    expect(invoicedCommission).to.shallowDeepEqual(stepContext.expected.invoicedCommission);
}

module.exports = {
    assertIC,
};
