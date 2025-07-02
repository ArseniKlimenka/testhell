'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');

async function asserter(step, context, stepContext) {

    const act = context.act;
    const criteria = {
        referenceNo: act.number,
    };

    const client = new Client();
    await testHelperFuncs.retryValidate(
        async () => callDataSource('GetReferenceInfoTestDataSource', {
            paging: undefined,
            criteria,
        }, client),
        (response) => {
            const references = response.data.map(_ => _.resultData);
            expect(references.length).to.equal(1, 'Wrong references count');
        },
    );
}

module.exports = {
    asserter,
};
