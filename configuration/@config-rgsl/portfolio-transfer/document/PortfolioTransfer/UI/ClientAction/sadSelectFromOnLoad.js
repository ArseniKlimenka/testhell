'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function sadSelectFromOnLoad(input, ambientProperties) {

    const protectedFields = [
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitName',
        'organisationUnitCodes',
        'includeChildren'
    ];

    const lookup = this.getLookup();
    const viewContext = lookup.getContext().viewContext;

    viewContext.lockServiceProviderType = true;
    viewContext.lockOrganisationUnit = true;
    viewContext.protectedFields = protectedFields;
    lookup.setProtectedFields(protectedFields);

    const partnerCode = input.context.Body.aaServiceProviderCodeFrom;

    let orgUnitCodeParent;
    let orgUnitNameParent;

    const requestOrgUnitCodeParent = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/OrganisationUnitsImplDataSource',
        data: {
            data: {
                criteria: {
                    partnerCode: partnerCode
                }
            }
        }
    };

    const resultOrgUnitCodeParent = await apiCall(this, ambientProperties, requestOrgUnitCodeParent);
    if (resultOrgUnitCodeParent.data && resultOrgUnitCodeParent.data.length > 0) {
        orgUnitCodeParent = resultOrgUnitCodeParent.data[0].resultData.code;
        orgUnitNameParent = resultOrgUnitCodeParent.data[0].resultData.name;
    }


    let orgUnitCodesChildren;
    const requestOrgUnitCodesChildren = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ChildrenOrganisationUnitsDataSource',
        data: {
            data: {
                criteria: {
                    orgUnitCode: orgUnitCodeParent
                }
            }
        }
    };

    const resultOrgUnitCodesChildren = await apiCall(this, ambientProperties, requestOrgUnitCodesChildren);
    if (resultOrgUnitCodesChildren.data && resultOrgUnitCodesChildren.data.length > 0) {
        orgUnitCodesChildren = resultOrgUnitCodesChildren.data.map(item => item.resultData.orgUnitCode);
    }

    lookup.setSearchRequest({
        data: {
            criteria: {
                serviceProviderType: 'Employee',
                organisationUnitCode: orgUnitCodeParent,
                organisationUnitName: orgUnitNameParent,
                organisationUnitCodes: orgUnitCodesChildren,
                includeChildren: true
            }
        }
    });

    lookup.search();

};

async function apiCall(self, ambientProperties, request) {
    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }
    return result;
}

