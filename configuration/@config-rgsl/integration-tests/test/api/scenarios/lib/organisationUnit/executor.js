const { MasterEntityBuilder } = require('@adinsure-tools/api-test-framework');
const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");
const chai = require('chai');
const expect = chai.expect;

async function createOrganisationUnit(request, parentId, actor) {
    const builder = new MasterEntityBuilder('OrganisationUnit');
    const data = await builder
        .setActor(actor)
        .setExample(request)
        .setCode(guidHelper.generate())
        .setParentId(parentId)
        .create()
        .retryValidateDataSource(
            'GetOrganisationUnitInfoDataSource',
            context => ({
                paging: undefined,
                criteria : { organisationUnitCode: context.code },
            }),
            (result, context) => {
                expect(result.data.organisationUnitCode, 'Organisation unit ASS was not populated!').to.be.equals(context.code);
            }
        )
        .build();

    const result = {
        id: data.id,
        code: data.code,
    };
    return result;
}

module.exports = {
    createOrganisationUnit,
};
