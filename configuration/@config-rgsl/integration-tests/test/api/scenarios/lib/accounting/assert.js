'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertTransactions(step, context, stepContext) {

    const expectedCount = stepContext.expected.contractTransactions.length;
    const scope = context.scope ?? 'contract';
    if (!context.maxPairNo) {
        context.maxPairNo = [];
    }

    const maxPairNo = context.maxPairNo[scope];
    const criteria = {
        pairNoFrom: maxPairNo ? maxPairNo + 1 : undefined,
    };
    if (context.transactionsRequest) {
        Object.assign(criteria, context.transactionsRequest);
    } else {
        criteria.contractNo = context.contractNumber;
    }

    const client = new Client();
    let contractTransactions;
    await testHelperFuncs.retryValidate(
        async () => callDataSource('GetTransactionInfoDataSource', {
            paging: undefined,
            criteria,
        }, client),
        (response) => {
            contractTransactions = response.data.map(_ => _.resultData);
            expect(contractTransactions.length).to.equal(expectedCount, 'Wrong transactions count');
        },
    );

    expect(contractTransactions).to.shallowDeepEqual(stepContext.expected.contractTransactions);
    console.log('Transactions count: ' + expectedCount);
    context.maxPairNo[scope] = Math.max(...contractTransactions.map(_ => _.pairNo));
}

module.exports = {
    assertTransactions,
};
