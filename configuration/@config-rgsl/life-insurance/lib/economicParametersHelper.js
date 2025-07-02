'use strict';

const { productConfigurationConst, universalVersionedDocument } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const ONLY_OK_BUTTON = 1;

function getNextRuleNumber(economicParameters) {

    const latestRuleNum = economicParameters.reduce((max, obj) => Math.max(max, obj.ruleNum), 0);

    return latestRuleNum + 1;
}

function updateRuleNumbers(economicParameters) {

    for (let i = 0; i < economicParameters?.length; i++) {
        economicParameters[i].ruleNum = i + 1;
    }
}

async function getProductConfigurationForEconomics(input, ambientProperties, that) {

    let currentRowData = {};

    if (input.operationType == 'Edit') {
        currentRowData = input.affectedRow;
    } else {
        currentRowData = input.data;
    }

    const productCode = currentRowData.insuranceProduct.productCode;
    const productDescription = currentRowData.insuranceProduct.productDescription;
    const policyIssueDateStart = currentRowData.policyIssueDateStart ?? productConfigurationConst.minIssueDate;
    const policyIssueDateEnd = currentRowData.policyIssueDateEnd ?? productConfigurationConst.maxIssueDate;

    let productConfigurations = [];

    if (productCode) {

        const requestProductConfiguration = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/GetProductConfigurationDataSource',
            data: {
                data: {
                    criteria: {
                        productCode: productCode,
                        maxVersion: true
                    }
                }
            }
        };

        let result;
        try {
            that.view.getParentView()?.startBlockingUI();
            result = await ambientProperties.services.api.call(requestProductConfiguration);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.getParentView()?.stopBlockingUI();
        }

        if (result.data?.length > 0) {

            productConfigurations = result.data.map(i => i.resultData);
            productConfigurations = DateTimeUtils.filterDateRanges(productConfigurations, policyIssueDateStart, policyIssueDateEnd);
            input.rootContext.ClientViewModel.productConfigurations = productConfigurations;

            if (productConfigurations.length > 0) {

                const uniqueProductConfCurrencies = [...new Set(productConfigurations.map(i => i.availableCurrencies).flat())];
                input.rootContext.ClientViewModel.uniqueProductConfCurrencies = uniqueProductConfCurrencies;

                const uniqueProductConfPartners = [...new Set(productConfigurations.map(i => i.partnerBusinessCode).flat())];
                input.rootContext.ClientViewModel.uniqueProductConfPartners = uniqueProductConfPartners;

                const uniqueProductConfPaymentFrequencies = [...new Set(productConfigurations.map(i => i.paymentFrequency).flat())];
                input.rootContext.ClientViewModel.uniqueProductConfPaymentFrequencies = uniqueProductConfPaymentFrequencies;

                const uniqueProductConfGuaranteedIncomes = [...new Set(productConfigurations.map(i => i.guaranteedIncome).flat())];
                input.rootContext.ClientViewModel.uniqueProductConfGuaranteedIncomes = uniqueProductConfGuaranteedIncomes;

                const uniqueProductConfInsuranceTermsYear = [...new Set(productConfigurations.map(i => i.insuranceTerms).flat())];
                input.rootContext.ClientViewModel.uniqueProductConfInsuranceTermsYear = uniqueProductConfInsuranceTermsYear;
            }

        } else {
            const msg = `Для продукта ${productDescription} (${productCode}) конфигурации продуктов не найдены.`;
            ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
        }
    }

    return productConfigurations;
}

async function getProductConfigurationNotifications(input, ambientProperties, that, productConfigurations) {

    let currentRowData = {};

    if (input.operationType == 'Edit') {
        currentRowData = input.affectedRow;
    } else {
        currentRowData = input.data;
    }

    const productCode = currentRowData.insuranceProduct.productCode;
    const productDescription = currentRowData.insuranceProduct.productDescription;
    const policyIssueDateStart = currentRowData.policyIssueDateStart ?? productConfigurationConst.minIssueDate;
    const policyIssueDateEnd = currentRowData.policyIssueDateEnd ?? productConfigurationConst.maxIssueDate;

    const policyIssueDateStartMsg = policyIssueDateStart ? DateTimeUtils.formatDate(policyIssueDateStart, DateTimeUtils.DateFormats.CALENDAR) : DateTimeUtils.formatDate(productConfigurationConst.minIssueDate, DateTimeUtils.DateFormats.CALENDAR);
    const policyIssueDateEndMsg = policyIssueDateEnd ? DateTimeUtils.formatDate(policyIssueDateEnd, DateTimeUtils.DateFormats.CALENDAR) : DateTimeUtils.formatDate(productConfigurationConst.maxIssueDate, DateTimeUtils.DateFormats.CALENDAR);

    if (productConfigurations.length == 0) {
        const msg = `Для продукта ${productDescription} (${productCode}) за период ${policyIssueDateStartMsg} - ${policyIssueDateEndMsg} конфигурации продуктов не найдены.`;
        ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
    }

    if (productConfigurations.length > 1) {

        const pcDates = productConfigurations.map(i => `${DateTimeUtils.formatDate(i.issueDateFrom, DateTimeUtils.DateFormats.CALENDAR)} - ${DateTimeUtils.formatDate(i.issueDateTo, DateTimeUtils.DateFormats.CALENDAR)}`).join(';\n');
        const msg = `Для продукта ${productDescription} (${productCode}) за период ${policyIssueDateStartMsg} - ${policyIssueDateEndMsg} найдено несколько конфигураций продуктов, периоды заключения: \n${pcDates}.`;
        ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
    }
}

async function productConfigurationOnChangeClean(input, ambientProperties, that) {

    let currentRowData = {};

    if (input.operationType == 'Edit') {
        currentRowData = input.affectedRow;
    } else {
        currentRowData = input.data;
    }

    currentRowData.partner = {};
    currentRowData.agentAgreement = {};
    currentRowData.currency = {};
    currentRowData.paymentFrequency = {};
    currentRowData.guaranteedIncome = {};
    currentRowData.basicInvestmentParameters = {};
    currentRowData.ratesOfReturn = {};
    currentRowData.strategyConfiguration = {};
}

function basicFilterByColumnName(input, columnName) {

    let filterResult = false;

    const filterValue = input.filterObj[columnName];
    const dataAttribute = input.data[columnName];

    if (!filterValue) {

        filterResult = true;

    } else if (typeof dataAttribute == 'object') {

        Object.keys(dataAttribute).forEach(key => {

            if (dataAttribute[key].includes(filterValue)) {
                filterResult = true;
            }

        });

    } else if (dataAttribute.includes(filterValue)) {

        filterResult = true;
    }

    return filterResult;
}

async function checkProductConfDuplicates(input, ambientProperties, that) {

    const productCode = input.data?.insuranceProduct?.productCode;
    const productDescription = input.data?.insuranceProduct?.productDescription;

    if (productCode) {

        const requestProductConfiguration = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/GetProductConfDataSource',
            data: {
                data: {
                    criteria: {
                        productCode: productCode,
                        excludeStates: ['Cancelled']
                    }
                }
            }
        };

        let result;
        try {
            that.view.getParentView()?.startBlockingUI();
            result = await ambientProperties.services.api.call(requestProductConfiguration);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.getParentView()?.stopBlockingUI();
        }

        if (result.data?.length > 0) {

            const productConfigurations = result.data.map(i => i.resultData);
            const productConfigurationsWithOutCorrections = productConfigurations.filter(i => i.confCodeName != universalVersionedDocument.CodeName.ProductConfigurationCorrection);

            if (productConfigurationsWithOutCorrections?.length > 0) {

                const message = `Найдены другие документы конфигураций для продукта ${productDescription} (${productCode}):`;
                const translate = ambientProperties.services.translate.getSync;
                const reqLinks = productConfigurationsWithOutCorrections.map(item => `<a href="/edit;entity=UniversalVersionedDocument;configurationCodeName=${item.confCodeName};version=1;documentNumber=${encodeURIComponent(item.uvdNumber)}">${item.uvdNumber} (${translate(ambientProperties.configurationCodeName.toUpperCase(), `states@${item.stateCodeName}`)})</a>`);

                ambientProperties.services.confirmationDialog.showNotification(`${message} ${reqLinks?.join(', ')}.`, 'OK', 'OK', ONLY_OK_BUTTON);
            }

            input.data.insuranceProduct = {};
        }
    }
}

function disableEditing(input, ambientProperties, that) {

    const currentActor = input.context?.WorkUnitActor?.CurrentActor;
    const isAllowToEditRoles = rolesAllowedToEditEconomicParameters.includes(currentActor);

    if (!isAllowToEditRoles) {
        that.view?.disableAllElements();
    }

    that.view?.rebind();
}

function disableAddButton(input, ambientProperties, that) {

    const stateCode = input.context.State.Code;
    const isActivated = stateCode == productConfigurationConst.State.Activated;

    if (isActivated) {
        return false;
    }

    return true;
}

function rebindOnStatusChanged(input, ambientProperties, that) {

    const state = input.context.State.Code;

    if (input.context.Number && state === 'Updating' || state === 'Activated') {
        const ProductConfigurationUpdateHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                that.unsubscribeFromEventsFromCurrentEntity('ProductConfigurationUpdateServerSideHandler');
                that.view.rebind();
                that.view.validate();
                that.view.reevaluateRules();
            }
        };

        that.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'ProductConfigurationUpdateServerSideHandler',
                func: ProductConfigurationUpdateHandler
            }
        });
    }
}

const sourceFileFormatEconomicParametersDataConstants = [{
    "fileFormat": 1,
    "formatName": "Excel",
    "dataSourceName": "FundAssetsXlsxFileLoaderDataSource"
}];

const rolesAllowedToViewEconomicParameters = [
    "ProductConfigurationViewer",
    "EconomicParametersViewer"
];

const rolesAllowedToEditEconomicParameters = [
    "ProductConfigurationEditor",
    "EconomicParametersEditor",
    "System"
];

const rolesAllowedToEconomicParameters = [
    ...rolesAllowedToViewEconomicParameters,
    ...rolesAllowedToEditEconomicParameters
];

const rolesAllowedToViewContractAdditionalParameters = [
    "ContractEntityViewer",
    "EconomicParametersViewer"
];

const rolesAllowedToEditContractAdditionalParameters = [
    "ContractEntityEditor",
    "EconomicParametersEditor",
    "System"
];

const rolesAllowedToContractAdditionalParameters = [
    ...rolesAllowedToViewContractAdditionalParameters,
    ...rolesAllowedToEditContractAdditionalParameters
];

const excludeNonMappingAttributes = [
    'ruleNum',
    'insuranceProduct',
    'enterValuesDate',
    'segment',
    'isin',
    'rko',
    'motivationFromMargin',
    'motivationFromProductEconomic',
    'skMargin',
    'fundingRateSwaps',
    'laps',
    'hedge',
    'clientID',
    'shareRF',
    'shareGF',
    'rvd',
    'fundingVersionSubFundID',
    'memorandumPkDate',
    'pkNumber',
    'analyticalAdjustment',
    'expectedReturnPercentAK',
    'insurance',
    'riskTransferProduct',
    'comments',
    'economicParametersCopyRow',
    'economicParametersUpdateContractEntities',
];

const excludePolicyIssueDateAttributes = [
    'policyIssueDateStart',
    'policyIssueDateEnd'
];

const excludeSubObjectsAttributes = {
    agentAgreement: [
        'id',
        'number',
        'manualNumber',
        'partnerBusinessCode',
        'partnerPartyCode',
        'aaName'
    ],
    basicInvestmentParameters: [
        'issueDateFrom',
        'issueDateTo'
    ],
    strategyConfiguration: [
        'issueDateFrom',
        'issueDateTo'
    ]
};

const economicParametersState = {
    Activated: "Activated"
};

module.exports = {
    getNextRuleNumber,
    updateRuleNumbers,
    getProductConfigurationForEconomics,
    getProductConfigurationNotifications,
    productConfigurationOnChangeClean,
    basicFilterByColumnName,
    checkProductConfDuplicates,
    disableEditing,
    disableAddButton,
    rebindOnStatusChanged,
    sourceFileFormatEconomicParametersDataConstants,
    rolesAllowedToViewEconomicParameters,
    rolesAllowedToEditEconomicParameters,
    rolesAllowedToEconomicParameters,
    rolesAllowedToViewContractAdditionalParameters,
    rolesAllowedToEditContractAdditionalParameters,
    rolesAllowedToContractAdditionalParameters,
    excludeNonMappingAttributes,
    excludePolicyIssueDateAttributes,
    excludeSubObjectsAttributes,
    economicParametersState
};
