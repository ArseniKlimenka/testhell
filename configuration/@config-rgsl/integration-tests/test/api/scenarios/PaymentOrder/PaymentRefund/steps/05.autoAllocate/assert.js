'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const chai = require('chai');
const expect = chai.expect;

async function assertAllocation(step, context, stepContext) {

    const po = context.paymentOrder;

    const client = new Client();
    await testHelperFuncs.retryValidate(
        async () => callDataSource('PODocumentSearchDataSource',
            ({
                paging: undefined,
                criteria: { paymentOrderNumber: po.paymentOrderNumber },
            }), client),
        response => {
            expect(response.data.length, 'No payment order found!').to.be.equal(1);
            const po = response.data[0].resultData;
            expect(po.originalStateCode, 'Wrong state!').to.be.equal('Paid');
        },
    );


    const allocatedAmount = context.bsiOutAllocationResult.reduce((a, b) => { return a + b.allocatedAmount; }, 0);
    chai.assert.equal(allocatedAmount, 100, 'Wrong amount allocated!');
    console.log('Allocated amount: ' + allocatedAmount);
}

module.exports = {
    assertAllocation,
};
