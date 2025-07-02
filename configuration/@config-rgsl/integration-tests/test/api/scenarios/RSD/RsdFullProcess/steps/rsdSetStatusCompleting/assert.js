'use strict';

const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;
const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

async function assertRsdCompleting(step, context, stepContext) {

    const client = new Client();
    const result = await testHelperFuncs.retryValidate(
        async () => callDataSource('GetRsdDocumentDataSource', {
            paging: undefined,
            criteria: {
                rsdNumber: context.rsdNumber,
                stateCodes: [rsdStatusIds.COMPLETED],
            },
        }, client),
        (response) => {
            expect(response.data.length, 'No RSD found in status `Completed`!').to.be.equal(1);
        },
    );
}

module.exports = {
    assertRsdCompleting,
};
