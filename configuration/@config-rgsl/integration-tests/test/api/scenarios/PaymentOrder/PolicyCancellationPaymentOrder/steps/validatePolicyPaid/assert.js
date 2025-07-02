'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { retryValidate } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPolicyPaid(step, context, stepContext) {

    const client = new Client();
    const result = await retryValidate(
        async () => callDataSource('GetPolicyAmendmentInfoTestDataSource', {
            paging: undefined,
            criteria: { amendmentNumber: context.amendment.number },
        }, client),
        (result, context) => {
            expect(result.data.state, 'Correct policy state was not set!').to.be.equal('Paid');
        },
        10
    );
}

module.exports = {
    assertPolicyPaid,
};
