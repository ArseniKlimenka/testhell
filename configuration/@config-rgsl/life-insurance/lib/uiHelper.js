'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const {
    sportProducts,
    salesSegment,
    salesSegmentRoles,
    excludeProductRoles,
    productGroupArray,
    productCode,
    productGroupCollective
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function copyPolicyHolderData(input) {

    const body = input?.rootContext?.Body;
    const isPolicyHolder = body?.insuredPerson?.isPolicyHolder;
    const partyData = body?.policyHolder?.partyData ?? {};
    input.rootContext.Body.insuredPerson.partyData = isPolicyHolder ? partyData : {};
}

async function copyInsuredDataToBeneficiary(that) {

    try {
        that.view.startBlockingUI();
        await that.view.evaluate(['/beneficiaries'], false, true);
        that.view.stopBlockingUI();
    } catch (error) {
        that.view.stopBlockingUI();
        throw error;
    }

}

function refreshView(view) {

    view.rebind();
    view.validate();
    view.reevaluateRules();
}

function disableTabs(tabLayout) {

    const tabNames = tabLayout && tabLayout.getAllTabs() || [];
    const enable = [
        'accountingEntries',
        'allocations',
        'ContractAdditionalParametersTabId'
    ];
    for (const tabName of tabNames) {
        if (enable.includes(tabName)) {
            continue;
        }

        tabLayout.disableTab(tabName);
    }
}

function getInsuranceProductFilter(ambientProperties, productItems, productGroup, partnerBusinessCode, byDate, createdFromPolicy, notification) {

    let result = productItems; // productItems: [{productCode - must!!!}]

    const filteredByMessageArr = [];
    const availableSalesSegments = [];
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();

    const issueDate = byDate || DateTimeUtils.newDateAsString();

    const isCollectivePolicy = ambientProperties.configurationCodeName == productCode.CollectiveLifeInsurancePolicy;
    if (isCollectivePolicy) {
        result = result.filter(item => !item.version);
    } else {
        result = result.filter(item => DateTimeUtils.isAfterOrEqual(issueDate, item.issueDateFrom) && DateTimeUtils.isBeforeOrEqual(issueDate, item.issueDateTo));
        result = result.filter(item => item.version);
    }

    // filter by sales segment
    if (productGroup && productGroup != productGroupCollective.Name) {

        Object.keys(salesSegment).forEach(salesSegmentKey => {
            const salesSegmentCode = salesSegment[salesSegmentKey].code;
            if (userRoles.some(item => salesSegmentRoles[salesSegmentCode][productGroup]?.includes(item.ApplicationRoleCodeName)))
            { availableSalesSegments.push(salesSegmentCode); }
        });

        result = result.filter(item => availableSalesSegments.includes(item.salesSegment) || sportProducts.includes(item.productCode));
        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'каналу продаж (salesSegment)');
    }

    // filter by partner
    if (partnerBusinessCode) {

        if (isCollectivePolicy) {
            result = result.filter(item => confCorp({ productCode: item.productCode, issueDate })?.partnerBusinessCode == partnerBusinessCode);
        } else {
            result = result.filter(item => item?.partnerBusinessCode == partnerBusinessCode);
        }

        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'партнёру (partnerBusinessCode)');
    }

    // filter by roles
    excludeProductRoles.forEach(item => {
        if (userRoles.some(role => role.ApplicationRoleCodeName == item.ApplicationRoleCodeName)) {
            result = result.filter(product => !item.productCodes.includes(product.productCode));
        }
    });
    getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'ролям (userRoles)');

    // filter by active dates
    const canIgnoreActiveDates = userRoles.some(item => ['GeneralBackOffice', 'SpecificSales'].includes(item.ApplicationRoleCodeName));

    if (!canIgnoreActiveDates) {

        if (isCollectivePolicy) {
            result = result.filter(item => {
                const productConf = confCorp({ productCode: item.productCode, issueDate });
                return DateTimeUtils.isBeforeOrEqual(productConf.activeFrom) && DateTimeUtils.isAfterOrEqual(productConf.activeTo);
            });
        } else {
            result = result.filter(item => DateTimeUtils.isBeforeOrEqual(item.activeFrom) && DateTimeUtils.isAfterOrEqual(item.activeTo));
        }

        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'датам действия продукта (activeFrom - activeTo)');
    }

    // filter genetic check-up
    if (!createdFromPolicy) {

        const isMedLifeGenCheckupRole = userRoles.some(i => i.ApplicationRoleCodeName == 'MedLifeGenCheckup');

        if (isMedLifeGenCheckupRole) {
            const geneticProductsNotFromEndowment = productGroupArray.GENCHK_NOT_FROM_ENDOWMENT;
            result = result.filter(item => !geneticProductsNotFromEndowment.includes(item.productCode));
        } else {
            const geneticProducts = productGroupArray.GENCHK;
            result = result.filter(item => !geneticProducts.includes(item.productCode));
        }

        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'продуктам группы Генетический чек-ап (geneticProducts)');
    }

    // filter recovery health if created from policy
    if (createdFromPolicy) {
        const recoveryHealthProducts = productGroupArray.RHE;
        result = result.filter(item => !recoveryHealthProducts.includes(item.productCode));
        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'продуктам группы Восстанови здоровье (recoveryHealthProducts)');
    }

    // filter migrated products on quotes
    if (ambientProperties.configurationCodeName.indexOf('Quote') > -1) {

        if (isCollectivePolicy) {
            result = result.filter(item => !confCorp({ productCode: item.productCode, issueDate })?.isMigrated);
        } else {
            result = result.filter(item => !item.isMigrated);
        }

        getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, 'мигрированным продуктам по котировкам (migrated products on quotes)');
    }

    return result.map(i => (
        {
            productCode: i.productCode,
            productDescription: i.productDescription,
            productGroup: i.productGroup,
            salesSegment: i.salesSegment
        }
    ));
}

async function getUserVisibilityType(input, ambientProperties) {

    let visibilityType;

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

    const result = await ambientProperties.services.api.call(requestCurrentUser);
    if (result.data && result.data.length > 0) {
        visibilityType = result.data[0].resultData.visibilityType;
    }

    return visibilityType;

}

function getNotificationMessageForProductFilter(result, notification, filteredByMessageArr, filteredByMessage) {

    if (result?.length == 0 && !notification.firstNullResult) {
        filteredByMessageArr.push(filteredByMessage);
        notification.message = `После фильтрации страховых продуктов по: ${filteredByMessageArr.join(' -> ')} доступные продукты для выбора не найдены!`;
        notification.firstNullResult = true;
    } else {
        filteredByMessageArr.push(filteredByMessage);
    }
}

module.exports = {
    copyPolicyHolderData,
    copyInsuredDataToBeneficiary,
    refreshView,
    disableTabs,
    getInsuranceProductFilter,
    getUserVisibilityType,
};
