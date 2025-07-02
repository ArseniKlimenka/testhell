'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function mainAgentOnLoad(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const protectedFields = [
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitName',
        'organisationUnitCodes',
        'includeChildren'
    ];

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().getContext().viewContext.lockOrganisationUnit = true;
    this.getLookup().getContext().viewContext.protectedFields = protectedFields;
    this.getLookup().setProtectedFields(protectedFields);
    const visibilityType = input.context.ClientViewModel?.userVisibilityType;
    const isWithChildren = [3].includes(visibilityType);

    if (isBackOffice) {

        const partnerCode = getValue(input, 'context.Body.mainInsuranceConditions.partner.partnerCode');
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
    else if (isWithChildren) {

        let orgUnitCodeParent;
        let orgUnitNameParent;
        const currentUserId = ambientProperties.applicationContext.currentUser().getUserId();
        const requestCurrentUser = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/UserDataSource',
            data: {
                data: {
                    criteria: {
                        userId: currentUserId
                    }
                }
            }
        };

        const resultCurrentUser = await apiCall(this, ambientProperties, requestCurrentUser);
        if (resultCurrentUser.data && resultCurrentUser.data.length > 0) {
            orgUnitCodeParent = resultCurrentUser.data[0].resultData.organisationUnitCode;
            orgUnitNameParent = resultCurrentUser.data[0].resultData.organisationUnitName;
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
    else {

        let orgUnitCodeParent;
        let orgUnitNameParent;
        const currentUserId = ambientProperties.applicationContext.currentUser().getUserId();
        const requestCurrentUser = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/UserDataSource',
            data: {
                data: {
                    criteria: {
                        userId: currentUserId
                    }
                }
            }
        };
        const resultCurrentUser = await apiCall(this, ambientProperties, requestCurrentUser);
        if (resultCurrentUser?.data.length > 0) {
            orgUnitCodeParent = resultCurrentUser.data[0].resultData.organisationUnitCode;
            orgUnitNameParent = resultCurrentUser.data[0].resultData.organisationUnitName;
        }

        this.getLookup().setSearchRequest({
            data: {
                criteria: {
                    serviceProviderType: 'Employee',
                    organisationUnitCode: orgUnitCodeParent,
                    organisationUnitName: orgUnitNameParent,
                    organisationUnitCodes: [],
                    includeChildren: false
                }
            }
        });

    }

    this.getLookup().search();
};

async function apiCall(self, ambientProperties, request) {
    let result;
    try {
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    return result;
}

