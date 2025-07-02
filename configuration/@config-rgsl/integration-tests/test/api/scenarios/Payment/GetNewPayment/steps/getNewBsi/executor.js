const bsiExecutor = require('../../../../lib/bsi/executor');
const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function executor(step, context, stepContext) {

    const newNumber = await testHelperFuncs.getNextUnique();
    const newGuid = idToGuid(newNumber);
    const paymentData = {
        number: newNumber,
        rgslGuid: newGuid,
        paymentGuid: 'qwerty',
    };
    await bsiExecutor.setNewBsiEtlData(paymentData);
    await bsiExecutor.startGetNewBsiEtl();

    console.log("BSI guid: " + newGuid);

    const client = new Client();
    const result = await testHelperFuncs.retryValidate(
        async () => callDataSource('BankStatementItemDatabaseDataSource', {
            paging: undefined,
            criteria : { rgslGuid: newGuid },
        }, client),
        (result, context) => {
            expect(result.data.length, 'BSI not found!').to.be.equal(1);
        },
    );
    const bsi = result.data[0].resultData;
    context.bsi = bsi;

    console.log("BSI id: " + context.bsi.bankStatementItemId);
    console.log("BSI no: " + context.bsi.bankStatementItemNo);
}

function idToGuid(id) {
    const y = (id & 0x3 | 0x8).toString(16);
    const x = id.toString(16).padStart(12, '0');
    return `00000000-0000-4000-${y}000-${x}`;
}

module.exports = {
    executor,
};
