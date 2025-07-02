const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

'use strict';

module.exports = async function organisationUnitOnSelected(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    const organisationUnitCode = lookupSelection[0].resultData.code;
    input.data.request.data.criteria.organisationUnitCode = organisationUnitCode;

    const organisationUnitName = lookupSelection[0].resultData.name;
    input.data.request.data.criteria.organisationUnitName = organisationUnitName;

    const partnerCode = lookupSelection[0].resultData.partnerCode;
    input.data.request.data.criteria.partnerCode = partnerCode;

    const orgUnitCodesChildren = await getOrgUnitCodesChildren(ambientProperties, organisationUnitCode);
    const organisationUnitCodes = orgUnitCodesChildren.map(item => item.resultData.orgUnitCode);
    input.data.request.data.criteria.organisationUnitCodes = organisationUnitCodes;

};

async function getOrgUnitCodesChildren(ambientProperties, organisationUnitCode) {
    const requestOrgUnitCodesChildren = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ChildrenOrganisationUnitsDataSource',
        data: {
            data: {
                criteria: {
                    orgUnitCode: organisationUnitCode
                }
            }
        }
    };

    let result = null;
    try {
        result = await ambientProperties.services.api.call(requestOrgUnitCodesChildren);
    }
    catch (err) {
        throwResponseError(err);
    }

    return result.data;
}
