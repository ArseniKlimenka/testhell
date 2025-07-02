const { MasterEntityBuilder } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

function getResult(data)
{
    const result = {};
    result.id = data.id;
    result.code = data.code;
    return result;
}

async function createServiceProvider(request, configurationName, actor) {
    const builder = new MasterEntityBuilder(configurationName);
    const data = await builder
        .setActor(actor)
        .setExample(request)
        .create()
        .retryValidateDataSource(
            'GetServiceProviderInfoDataSource',
            context => ({
                paging: undefined,
                criteria : { serviceProviderCode: context.code },
            }),
            (result, context) => {
                expect(result.data.serviceProviderCode, 'Service provider ASS was not populated!').to.be.equals(context.code);
            },
        )
        .build();

    return getResult(data);
}

async function createEmployee(request, actor) {
    return await createServiceProvider(request, 'Employee', actor);
}

async function createPartner(request, actor) {
    return await createServiceProvider(request, 'Partner', actor);
}

async function createReinsurer(request, actor) {
    return await createServiceProvider(request, 'Reinsurer', actor);
}

module.exports = {
    createEmployee,
    createPartner,
    createReinsurer,
};
