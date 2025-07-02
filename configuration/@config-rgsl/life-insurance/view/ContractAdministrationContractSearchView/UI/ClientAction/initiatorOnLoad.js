'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function initiatorOnLoad(input, ambientProperties) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().getContext().viewContext.lockOrganisationUnit = true;
    this.getLookup().setProtectedFields([
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitCodes',
        'includeChildren'
    ]);

    let partnerCode;
    let orgUnitCodeParent;
    let orgUnitNameParent;
    let orgUnitCodesChildren;

    const organisationUnitCodesCriteria = getValue(input, 'context.request.data.criteria.organisationUnitCodes', []);
    const organisationUnitCodeCriteria = getValue(input, 'context.request.data.criteria.organisationUnitCode', undefined);
    const organisationUnitNameCriteria = getValue(input, 'context.request.data.criteria.organisationUnitName', undefined);
    const includeChildrenCriteria = getValue(input, 'context.request.data.criteria.includeChildren', false);

    if (organisationUnitCodeCriteria) {
        this.getLookup().setSearchRequest({
            data: {
                criteria: {
                    serviceProviderType: 'Employee',
                    organisationUnitCode: organisationUnitCodeCriteria,
                    organisationUnitName: organisationUnitNameCriteria,
                    organisationUnitCodes: organisationUnitCodesCriteria,
                    includeChildren: includeChildrenCriteria
                }
            }
        });
    }
    else {
        const requestServiceProvider = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
            data: {
                data: {
                    criteria: {
                        businessCode: '15',
                        serviceProviderType: 'Partner'
                    }
                }
            }
        };
        const resultServiceProvider = await ambientProperties.services.api.call(requestServiceProvider);
        if (resultServiceProvider.data && resultServiceProvider.data.length > 0) {
            partnerCode = resultServiceProvider.data[0].resultData.serviceProviderCode;
        }

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
        const resultOrgUnitCodeParent = await ambientProperties.services.api.call(requestOrgUnitCodeParent);
        if (resultOrgUnitCodeParent.data && resultOrgUnitCodeParent.data.length > 0) {
            orgUnitCodeParent = resultOrgUnitCodeParent.data[0].resultData.code;
            orgUnitNameParent = resultOrgUnitCodeParent.data[0].resultData.name;
        }

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
        const resultOrgUnitCodesChildren = await ambientProperties.services.api.call(requestOrgUnitCodesChildren);
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
    }

    this.getLookup().search();
};
