const testHelperFuncs = require('../common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

module.exports = {
    importBsi,
    setNewBsiEtlData,
    startGetNewBsiEtl,
};

async function importBsi(request) {

    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/bank-statement/insert',
        requestBody: request});

    const no = request.items[0].bankStatementItemNo;
    const id = data.createdBankStatementItems[0];

    await testHelperFuncs.retryValidate(
        async () => callDataSource('BankStatementItemRgslSearchDataSource', {
            paging: undefined,
            criteria : { bankStatementItemId: id },
        }, client),
        (response) => {
            expect(response.data.length, 'Payment was not found!').to.be.equal(1);
        }
    );

    return {
        no,
        id,
    };
}

async function setNewBsiEtlData(request) {

    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/rgsl/mock-services/bank-statements/get-bank-statements/set-data',
        requestBody: request});
}

async function startGetNewBsiEtl() {

    const request = {
        data: {
        }
    };

    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/core/shared/etl-services/GetNewBankStatementsRgslEtlService/1',
        requestBody: request});
}

