'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertAllocations(step, context, stepContext) {

    const client = new Client();

    const bsiData = await callDataSource('BankStatementItemDatabaseDataSource', {
        paging: undefined,
        criteria : { bankStatementItemId: context.bsi.id },
    }, client);

    const allocationData = await callDataSource('GetAllocationTestDataSource', {
        paging: undefined,
        criteria : { bankStatementItemId: context.bsi.id },
    }, client);


    expect(bsiData.data.length, 'BSI not found!').to.be.equal(1);
    const bsi = bsiData.data[0].resultData;
    expect(bsi).to.shallowDeepEqual(stepContext.expected.payment);

    const allocations = allocationData.data.map(_ => _.resultData);
    expect(allocations).to.shallowDeepEqual(stepContext.expected.allocations);
}

module.exports = {
    assertAllocations,
};
