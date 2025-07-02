const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function employeeNameOnLoad(input, ambientProperties) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().getContext().viewContext.lockOrganisationUnit = true;
    this.getLookup().setProtectedFields([
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitCodes',
        'includeChildren'
    ]);

    const partnerCode = getValue(input, 'context.Body.partner.partnerCode');
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
    let resultOrgUnitCodeParent;
    try {
        this.view.startBlockingUI();
        resultOrgUnitCodeParent = await ambientProperties.services.api.call(requestOrgUnitCodeParent);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }
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
    let resultOrgUnitCodesChildren;
    try {
        this.view.startBlockingUI();
        resultOrgUnitCodesChildren = await ambientProperties.services.api.call(requestOrgUnitCodesChildren);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }
    if (resultOrgUnitCodesChildren.data && resultOrgUnitCodesChildren.data.length > 0) {
        orgUnitCodesChildren = resultOrgUnitCodesChildren.data.map(item => item.resultData.orgUnitCode);
    }

    this.getLookup().setSearchRequest({
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

    this.getLookup().search();

};
