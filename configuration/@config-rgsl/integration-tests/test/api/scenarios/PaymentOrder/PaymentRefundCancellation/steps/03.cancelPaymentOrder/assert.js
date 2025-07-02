'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { retryValidate } = require('../../../../lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPO(step, context, stepContext) {

    const client = new Client();
    const result = await retryValidate(
        async () => callDataSource('BankStatementItemRgslSearchDataSource', {
            paging: undefined,
            criteria : { bankStatementItemId: context.bsiIn.id },
        }, client),
        (result, context) => {
            expect(result.data.length, 'BSI not found!').to.be.equal(1);
            const bsi = result.data[0].resultData;
            expect(bsi.openAmount, 'Open amount must not be zero').to.not.be.equal(0);
        },
    );
}

module.exports = {
    assertPO,
};
