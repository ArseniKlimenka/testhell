const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function retryValidate(resultFunction, validation, retryCount = 6) {
    let successful = true;
    let delay = 250;
    let result;
    let attemptCount = 0;

    while (retryCount-- > 0) {
        await new Promise(resolve => setTimeout(resolve, delay)); // Initial wait before getting data
        delay *= 2;
        console.log('Try ' + (++attemptCount) + ': ');
        result = await resultFunction();
        successful = true;
        try {
            validation(result);
        }
        catch (error) {
            successful = false;
            if (retryCount === 0) {
                throw error;
            }
        }
        if (successful === true) {
            break;
        }
    }
    return result;
}

async function getNextUnique() {
    const client = new Client();

    const data = await client.HttpPost({
        apiPath: '/api/rgsl/common/shared/sequence/get-next-unique',
        requestBody: {}});
    return data;
}

async function executeEtlService(etlName, request) {
    const client = new Client();
    const data = await client.HttpPost({
        apiPath: `/api/core/shared/etl-services/${etlName}/1`,
        requestBody: { data: request }});

    await retryValidate(
        async () => callDataSource('GetEtlInfoDataSource', {
            paging: undefined,
            criteria: { executionId: data.executionId },
        }, client),
        (response) => {
            expect(response.data, 'ETL was not finished!').to.not.be.undefined;
            expect(response.data.status, 'ETL was not finished successfully!').to.be.equal(2);
        },
    );
}

async function executeIntegrationService(integrationServiceName, request, actor) {
    const client = new Client();
    const data = await client.HttpPost({
        actor: actor,
        apiPath: `/api/core/shared/integration-services/${integrationServiceName}/1`,
        requestBody: { data: request }});
    return data;
}

module.exports = {
    retryValidate,
    getNextUnique,
    executeEtlService,
    executeIntegrationService,
};
