'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertAccCert(step, context, stepContext) {

    const criteria = {
        accountingCertificateNumber: context.integrationServiceResult.Number,
    };

    console.log('AccountingCertificate: ' + context.integrationServiceResult.Number);

    const client = new Client();
    await testHelperFuncs.retryValidate(
        async () => callDataSource('GetAccountingCertificateDataSource', {
            noPaging: true,
            criteria,
        }, client),
        (response) => {
            expect(response.data.length, 'Only one item must be found!').to.be.equal(1);

            const accCert = response.data[0].resultData;
            expect(accCert).to.shallowDeepEqual(stepContext.expected);
        },
    );
}

module.exports = {
    assertAccCert,
};
