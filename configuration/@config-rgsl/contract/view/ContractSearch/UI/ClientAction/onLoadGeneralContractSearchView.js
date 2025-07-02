'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { visibilityType } = require('@config-rgsl/employee/lib/employeeConstants');
const { salesSegmentRoles, productGroupCollective, salesGroupByPartnerCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadGeneralContractSearchView(input, ambientProperties) {

    try {
        this.view.startBlockingUI();

        // init key params
        // createdOnFrom - technical param to be available to search without input visible params
        const viewContext = input.context.viewContext;
        const criteria = {
            createdOnFrom: dateTimeUtils.formatDate('1900-01-01')
        };
        const searchRequest = { data: { criteria: criteria } };
        const protectedFields = ['createdOnFrom'];

        // set products array
        const productsArray = await getAvailableProducts(ambientProperties);
        input.context.productsArray = productsArray;
        const productsCodesArray = productsArray.map(item => item.productCode);
        criteria.productsArray = productsCodesArray;
        protectedFields.push('productsArray');

        // check user
        const currentUserId = ambientProperties.applicationContext.currentUser().getUserId();
        const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
        const userData = await getUserData(currentUserId, ambientProperties);
        const userGroups = ambientProperties.applicationContext.currentUser().getUserGroups();
        const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();

        // check is user from back office
        const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
        const isCoach = userRoles.some(item => item.ApplicationRoleCodeName == 'Coach');
        if (isBackOffice || userData.userName == 'API_EFR' || isCoach) {
            await setBackOfficeParams(ambientProperties, userData, criteria, protectedFields, viewContext, userGroups, isCoach);
        }
        else {
            switch (userData.visibilityType) {
                case visibilityType.onlyMy:
                    setOnlyMyParams(userData, criteria, protectedFields, viewContext);
                    break;
                case visibilityType.myDepartment:
                    setMyDepartmentParams(userData, criteria, protectedFields, viewContext);
                    break;
                case visibilityType.myDepartmentAndChildren:
                    await setMyDepartmentAndChildrenParams(ambientProperties, userData, criteria, protectedFields, viewContext);
                    break;
                case visibilityType.all:
                    await setAllParams(ambientProperties, userData, criteria, protectedFields, viewContext);
                    break;
                default:
                    setOnlyMyParams(userData, criteria, protectedFields, viewContext);
                    break;
            }
        }

        // check accounting certificate
        await setAccountingCertificateParams(criteria, protectedFields);

        await finishLoad(this, searchRequest, protectedFields);

        this.view.stopBlockingUI();

    } catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }


    // help functions
    async function getAvailableProducts(ambientProperties) {

        // get all products
        const request = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
            data: {
                data: {
                    criteria: {}
                }
            }
        };

        let result;
        try {
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }

        const products = result.data.map(item => {
            return {
                productCode: item.resultData.productCode,
                productGroup: item.resultData.productGroup,
                productDescription: item.resultData.productDescription,
                productSalesSegment: item.resultData.salesSegment
            };
        });

        // filter available for user products
        const availableSalesSegments = [];
        const availableProductGroups = [];
        const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
        userRoles
            .forEach(role => Object.keys(salesSegmentRoles)
                .forEach(segment => Object.keys(salesSegmentRoles[segment])
                    .forEach(group => {
                        if (salesSegmentRoles[segment][group].includes(role.ApplicationRoleCodeName)) {
                            availableSalesSegments.push(segment);
                            availableProductGroups.push(group);
                        }
                    })));

        const availableProducts = products.filter(item =>
            availableProductGroups.includes(item.productGroup) &&
            availableSalesSegments.includes(item.productSalesSegment)
        );

        return availableProducts;
    }

    async function setBackOfficeParams(ambientProperties, userData, criteria, protectedFields, viewContext, userGroups, isCoach) {
        viewContext.showInitiatorGroup = true;
        viewContext.enableInitiator = true;
        viewContext.showOrganisationGroup = true;
        viewContext.enableOrganisationUnit = true;
        viewContext.enableIncludeChildren = true;

        let userAdditionalOrgUnits = [];
        if (userData.userName == 'API_EFR') {
            const bfkoPartnersBusinessCodes = Object.keys(salesGroupByPartnerCode).filter(x => salesGroupByPartnerCode[x].indexOf('BFKO') > 0);
            for (let i = 0; i < bfkoPartnersBusinessCodes.length; i++) {
                const bfkoPartnerHeadOrgUnit = await getPartnerHeadOrgUnit(bfkoPartnersBusinessCodes[i], ambientProperties);
                if (bfkoPartnerHeadOrgUnit.code) { userAdditionalOrgUnits.push(bfkoPartnerHeadOrgUnit.code); }
            }
        }
        /*
        else if (isCoach) {
            const partnersBusinessCodes = [];
            userGroups.forEach(item => {
                const possiblePartnerCode = Object.keys(salesGroupByPartnerCode).filter(x => salesGroupByPartnerCode[x] == item.UserGroupName);
                if (possiblePartnerCode) {
                    partnersBusinessCodes.push(possiblePartnerCode[0]);
                }
            });
            for (let i = 0; i < partnersBusinessCodes.length; i++) {
                const partnerHeadOrgUnit = await getPartnerHeadOrgUnit(partnersBusinessCodes[i], ambientProperties);
                if (partnerHeadOrgUnit.code) { userAdditionalOrgUnits.push(partnerHeadOrgUnit.code); }
            }
        }
        */
        else {
            userAdditionalOrgUnits = await getUserAdditionalOrgUnits(userData.employeeCode, ambientProperties);
        }
        const userAdditionalOrgUnitsChildren = await getUserAdditionalOrgUnitsChildren(userAdditionalOrgUnits);
        if (userAdditionalOrgUnitsChildren.length > 0) {
            userAdditionalOrgUnitsChildren.forEach(item => userAdditionalOrgUnits.push(item));
        }
        viewContext.userAdditionalOrgUnits = userAdditionalOrgUnits;
        if (userAdditionalOrgUnits.length > 0) {
            criteria.userAdditionalOrgUnits = userAdditionalOrgUnits;
            protectedFields.push('userAdditionalOrgUnits');
        }
    }

    async function finishLoad(that, searchRequest, protectedFields) {
        that.setSearchRequest(searchRequest);
        that.setProtectedFields(protectedFields);
        // that.search();
    }

    async function getPartnerHeadOrgUnit(partnerBusinessCode, ambientProperties) {
        let partnerCode;
        const requestServiceProvider = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
            data: {
                data: {
                    criteria: {
                        businessCode: partnerBusinessCode,
                        serviceProviderType: 'Partner'
                    }
                }
            }
        };

        let resultServiceProvider;
        try {
            resultServiceProvider = await ambientProperties.services.api.call(requestServiceProvider);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (resultServiceProvider.data && resultServiceProvider.data.length > 0) {
            partnerCode = resultServiceProvider.data[0].resultData.serviceProviderCode;
        }

        const headOrgUnit = {};
        if (partnerCode) {
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
                resultOrgUnitCodeParent = await ambientProperties.services.api.call(requestOrgUnitCodeParent);
            }
            catch (err) {
                throwResponseError(err);
            }

            if (resultOrgUnitCodeParent.data && resultOrgUnitCodeParent.data.length > 0) {
                headOrgUnit.code = resultOrgUnitCodeParent.data[0].resultData.code;
                headOrgUnit.name = resultOrgUnitCodeParent.data[0].resultData.name;
                headOrgUnit.businessCode = resultOrgUnitCodeParent.data[0].resultData.businessCode;
            }
        }
        return headOrgUnit;
    }

    async function getUserData(currentUserId, ambientProperties) {
        let userData = {};
        const requestUserData = {
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

        let resultUserData;
        try {
            resultUserData = await ambientProperties.services.api.call(requestUserData);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (resultUserData && resultUserData.data && resultUserData.data.length > 0) {
            userData = resultUserData.data[0].resultData;
        }

        return userData;
    }

    async function getUserAdditionalOrgUnits(employeeCode, ambientProperties) {
        let userAdditionalOrgUnits = [];
        const requestUserData = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/OrganisationUnitsByEmployeeDataSource',
            data: {
                data: {
                    criteria: {
                        employeeCode: employeeCode
                    }
                }
            }
        };

        let resultUserData;
        try {
            resultUserData = await ambientProperties.services.api.call(requestUserData);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (resultUserData && resultUserData.data && resultUserData.data.length > 0) {
            userAdditionalOrgUnits = resultUserData.data.map(item => item.resultData.organisationUnitCode);
        }
        return userAdditionalOrgUnits;
    }

    async function getOrgUnitCodeByBusinessCode(orgUnitBusinessCode, ambientProperties) {
        let orgUnitCode;
        const requestOrgUnitCode = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/OrganisationUnitsImplDataSource',
            data: {
                data: {
                    criteria: {
                        businessCode: orgUnitBusinessCode
                    }
                }
            }
        };

        let result;
        try {
            result = await ambientProperties.services.api.call(requestOrgUnitCode);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (result && result.data && result.data.length > 0) {
            orgUnitCode = result.data[0].resultData.code;
        }
        return orgUnitCode;
    }

    function setOnlyMyParams(userData, criteria, protectedFields, viewContext) {
        criteria.initiatorServiceProviderCode = userData.employeeCode;
        criteria.initiatorName = userData.partyFullName;
        protectedFields.push('initiatorServiceProviderCode', 'initiatorName');
        viewContext.headOrgUnit = {
            code: userData.organisationUnitCode,
            name: userData.organisationUnitName
        };
        viewContext.showInitiatorGroup = false;
        viewContext.enableInitiator = false;
        viewContext.showOrganisationGroup = false;
        viewContext.enableOrganisationUnit = false;
        viewContext.enableIncludeChildren = false;
    }

    function setMyDepartmentParams(userData, criteria, protectedFields, viewContext) {
        criteria.organisationUnitCode = userData.organisationUnitCode;
        criteria.organisationUnitName = userData.organisationUnitName;
        criteria.includeChildren = false;
        protectedFields.push('organisationUnitCode', 'organisationUnitName', 'includeChildren');
        viewContext.headOrgUnit = {
            code: userData.organisationUnitCode,
            name: userData.organisationUnitName
        };
        viewContext.showInitiatorGroup = true;
        viewContext.enableInitiator = true;
        viewContext.showOrganisationGroup = false;
        viewContext.enableOrganisationUnit = false;
        viewContext.enableIncludeChildren = false;
    }

    async function setMyDepartmentAndChildrenParams(ambientProperties, userData, criteria, protectedFields, viewContext) {
        const orgUnitCodesChildren = await getOrgUnitCodesChildren(ambientProperties, userData.organisationUnitCode);
        criteria.organisationUnitCode = userData.organisationUnitCode;
        criteria.organisationUnitName = userData.organisationUnitName;
        criteria.includeChildren = true;
        criteria.organisationUnitCodes = orgUnitCodesChildren;
        protectedFields.push('organisationUnitCode', 'organisationUnitName', 'includeChildren', 'organisationUnitCodes');
        viewContext.headOrgUnit = {
            code: userData.organisationUnitCode,
            name: userData.organisationUnitName,
            childCodes: orgUnitCodesChildren
        };
        viewContext.showInitiatorGroup = true;
        viewContext.enableInitiator = true;
        viewContext.showOrganisationGroup = true;
        viewContext.enableOrganisationUnit = true;
        viewContext.enableIncludeChildren = true;
    }

    async function setAllParams(ambientProperties, userData, criteria, protectedFields, viewContext, self) {
        const headOrgUnit = await getPartnerHeadOrgUnit(userData.partnerBusinessCode, ambientProperties, self);
        const orgUnitCodesChildren = await getOrgUnitCodesChildren(ambientProperties, headOrgUnit.code);
        criteria.organisationUnitCode = headOrgUnit.code;
        criteria.organisationUnitName = headOrgUnit.name;
        criteria.includeChildren = true;
        criteria.organisationUnitCodes = orgUnitCodesChildren;
        protectedFields.push('organisationUnitCode', 'organisationUnitName', 'includeChildren', 'organisationUnitCodes');
        viewContext.headOrgUnit = {
            code: headOrgUnit.code,
            name: headOrgUnit.name,
            childCodes: orgUnitCodesChildren
        };
        viewContext.showInitiatorGroup = true;
        viewContext.enableInitiator = true;
        viewContext.showOrganisationGroup = true;
        viewContext.enableOrganisationUnit = true;
        viewContext.enableIncludeChildren = true;
    }

    async function getOrgUnitCodesChildren(ambientProperties, organisationUnitCode) {
        let orgUnitCodesChildren = [];
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
        let result;
        try {
            result = await ambientProperties.services.api.call(requestOrgUnitCodesChildren);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (result.data && result.data.length > 0) {
            orgUnitCodesChildren = result.data.map(item => item.resultData.orgUnitCode);
        }
        return orgUnitCodesChildren;
    }

    async function setAccountingCertificateParams(criteria, protectedFields) {

        const isAccountingCertificate = input.rootContext.ConfigurationCodeName == 'AccountingCertificate';

        if (isAccountingCertificate) {
            criteria.contractType = 'Policy';
            protectedFields.push('contractType');
        }
    }

    async function getUserAdditionalOrgUnitsChildren(userAdditionalOrgUnits) {
        const userAdditionalOrgUnitsChildren = [];
        for (let i = 0; i < userAdditionalOrgUnits.length; i++) {
            const orgUnitCodesChildren = await getOrgUnitCodesChildren(ambientProperties, userAdditionalOrgUnits[i]);
            if (orgUnitCodesChildren.length > 0) {
                orgUnitCodesChildren.forEach(item => userAdditionalOrgUnitsChildren.push(item));
            }
        }
        return userAdditionalOrgUnitsChildren;
    }

};
