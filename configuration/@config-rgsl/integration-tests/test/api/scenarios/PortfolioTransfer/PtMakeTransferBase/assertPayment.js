'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPayment(step, context, stepContext) {

    const criteria = {
        contractNumber: context.contractNumber,
    };

    const client = new Client();
    await testHelperFuncs.retryValidate(
        async () => callDataSource('GetPolicyInfoTestDataSource', {
            noPaging: true,
            criteria,
        }, client),
        (response) => {
            const policyInfo = response.data;
            expect(policyInfo.state, 'Correct policy state was not set!').to.be.equal('Activated');
            expect(policyInfo.refExists, 'No reference was created!').to.be.true;
            expect(policyInfo.ppLoadDate, 'PP was not generated!').to.not.be.undefined;
            expect(policyInfo.commLoadDate, 'Policy commission was not generated!').to.not.be.undefined;
        },
    );
}

module.exports = {
    assertPayment,
};
