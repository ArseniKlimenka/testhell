const testHelperFuncs = require('../common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

module.exports = {
    allocate,
    autoAllocate,
};

async function allocate(bsiId, payAmount, docAmount, referenceNo, actor) {
    const request = {
        bankStatementItemId: bsiId,
        payAmount: payAmount,
        docAmount: docAmount,
        referenceNo: referenceNo,
        toleranceType: 2,
    };
    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/allocation/allocate',
        requestBody: request,
        actor: actor});

    return data;
}

async function autoAllocate(bsiId, actor, expectedMatchAmount, expectedPostAmount) {
    const request = {
        bankStatementItemIds: [bsiId],
    };
    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/auto-allocation/auto-allocate',
        requestBody: request,
        actor: actor});

    await testHelperFuncs.retryValidate(
        async () => callDataSource('GetPaymentInfoDataSource', {
            paging: undefined,
            criteria : { bankStatementItemId: bsiId },
        }, client),
        (response) => {
            expect(response.data.matchedDocAmount, 'Wrong matched amount!').to.be.equal(expectedMatchAmount);
            expect(response.data.postedDocAmount, 'Wrong posted amount!').to.be.equal(expectedPostAmount);
        },
        7
    );

    return data.allocationResponses;
}

