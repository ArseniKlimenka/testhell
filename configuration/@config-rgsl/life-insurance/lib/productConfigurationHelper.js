/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatProductConfigurationDataConstants = [{
    "fileFormat": 1,
    "formatName": "Excel",
    "dataSourceName": "ProductConfigurationXlsxFileLoaderDataSource"
}];

const intAttributesArr = [
    'numOfWorkDaysToInvest',
    'holderAgeOnStartDateMin',
    'holderAgeOnStartDateMax',
    'holderAgeOnStartDateMaxMandatoryAgreement',
    'holderAgeOnEndDateMax',
    'insuredAgeOnStartDateMin',
    'insuredAgeOnStartDateMandatoryAgreement',
    'payPeriodDays',
    'gracePeriodDays',
    'coolOffPeriodDays',
    'payPeriodDaysReinvest',
    'didType'
];

const stringAttributesArr = [
    'productCode',
    'productDescription',
    'productGroupCode',
    'prefixOld',
    'ruleCode',
    'partnerBusinessCode',
    'applicationPrintout',
    'policyPrintout',
    'policyHolderType',
    'cardType',
    'cumulationProductGroup'
];

const dateAttributesArr = [
    'activeFrom',
    'activeTo'
];

const floatAttributesArr = [
    'mf',
    'coolOffDIDRate',
    'giftServicesPremium',
    'maxInsuredSumMainRisk',
    'maxInsuredSumMainRiskMandatoryAgreement'
];

const booleanAttributesArr = [
    'isWholeLife',
    'insuredIsPolicyHolder',
    'setFirstFixedInsuredSum',
    'disableRiskInsuredSum',
    'allowCalcFromPremium',
    'allowCalcFromInsuredSum',
    'canHaveAdditionalRisks',
    'isPaidUpAvailable',
    'useThreePayments',
    'showFinKnowledgeQuestionnaire',
    'isReinvestAvailable',
    'isReinvestFieldsAvailable',
    'invoiceOnActivationIfReinvest',
    'isMigrated',
    'consentToDataTransferingFNS',
    'isProductLinkedToAsset'
];

const objectAttributesArr = [
    'insuredAgeOnStartDateMax',
    'insuredAgeOnEndDateMax',
    'insuredAgeOnEndDateMaxMandatoryAgreement',
    'prefix',
    'prefixByStrategyOld',
    'prefixByStrategy',
    'fixedPremiums',
    'fixedInsuredSums',
    'minRiskInsuredSum',
    'minPremium',
    'daysBetweenIssueAndStart',
    'cashBackCoeff',
    'daysBetweenIssueAndStartReinvest'
];

const objectWrongAttributesArr = [
    'maxRiskInsuredSum',
    'maxPremium',
    'maxPremiumMandatoryAgreement'
];

const arrayAttributesArr = [
    'paymentFrequency',
    'insuranceTerms',
    'insuranceTermsMonths',
    'insuranceTermsDays',
    'strategy',
    'additionalServices',
    'giftServices',
    'riskPackages',
    'paperTypes',
    'creditPrograms',
    'availableCurrencies',
    'guaranteedIncome',
    'availablePaymentFrequency'
];

const issueDateStrConst = [
    'issueDateStr'
];
async function getProductConfiguration(ambientProperties, productCode, issueDate) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetProductConfigurationDataSource',
        data: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    issueDate
                }
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData);

    if (productCode && issueDate) {
        return result[0];
    }

    return result;
}

async function productConfigurationEnrich(productCode, issueDate) {

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/mainInsuranceConditions[GetCancellationRecipientsBankAccounts]']);
}

function productConfigurationFilter(productConfiguration, isCollectivePolicy, productCode, issueDate) {

    if (isCollectivePolicy) {
        return productConfiguration({
            productCode: item.productCode,
            issueDate
        }) ?? {};
    }
    const productConf = productConfiguration?.filter(pc => pc.productCode == productCode && issueDate >= pc.issueDateFrom && issueDate <= pc.issueDateTo)[0] ?? {};
    return productConf;

}

async function getProductConfigurationLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetProductConfigurationImportDataSource',
        data: {
            data: {
                criteria: {
                    maxVersion: true
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(request);
    } catch (err) {
        throwResponseError(err);
    }

    let lastVersion = 1;

    if (result?.data?.length > 0) {
        lastVersion = result.data[0].resultData.version;
    }

    return lastVersion;
}

async function getUniversalConfiguration(ambientProperties, configDataSource) {

    const request = {
        method: 'post',
        url: `api/entity-infrastructure/shared/datasource/${configDataSource}`,
        data: {
            data: {
                criteria: {}
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData);

    return result;
}

async function getUniversalConfigurationInfo(input, ambientProperties, that, configDataSource) {

    const isDocumentImported = input.context.State.Code == 'Imported';

    input.context.Body.importedConfigs = {};
    input.context.Body.importedConfigs.configBeforePrevious = {};
    input.context.Body.importedConfigs.configPrevious = {};
    input.context.Body.importedConfigs.configCurrent = {};
    input.context.Body.importedConfigs.configNotification = 'Проверка конфигураций...';
    input.context.Body.importedConfigs.status = "Warning";

    const configurations = await getUniversalConfiguration(ambientProperties, configDataSource);

    if (isDocumentImported && configurations?.length > 0) {

        const configCurrentVersion = configurations.sort(function(a, b) {
            if (a.version > b.version) {
                return 1;
            } else if (a.version < b.version) {
                return -1;
            }
            return 0;
        })[configurations.length - 1]?.version;

        const configCurrent = configurations.filter(i => i.version == configCurrentVersion);
        const configCurrentRows = configCurrent.length;
        const configCurrentLastRow = configCurrent[configCurrentRows - 1];

        input.context.Body.importedConfigs.configCurrent.rows = configCurrentRows;
        input.context.Body.importedConfigs.configCurrent.loadedBy = configCurrentLastRow.loadedBy;
        input.context.Body.importedConfigs.configCurrent.loadDate = configCurrentLastRow.loadDate;
        input.context.Body.importedConfigs.configCurrent.importDocumentId = configCurrentLastRow.importDocumentId;

        input.context.Body.importedConfigs.configNotification = '';
        input.context.Body.importedConfigs.status = "Success";

        if (configCurrentVersion > 1) {

            const configPreviousVersion = configCurrentVersion - 1;
            const configPrevious = configurations.filter(i => i.version == configPreviousVersion);
            const configPreviousRows = configPrevious.length;
            const configPreviousLastRow = configPrevious[configPreviousRows - 1];

            input.context.Body.importedConfigs.configPrevious.rows = configPreviousRows;
            input.context.Body.importedConfigs.configPrevious.loadedBy = configPreviousLastRow?.loadedBy;
            input.context.Body.importedConfigs.configPrevious.loadDate = configPreviousLastRow?.loadDate;
            input.context.Body.importedConfigs.configPrevious.importDocumentId = configPreviousLastRow?.importDocumentId;
            input.context.Body.importedConfigs.status = "Success";

            if (configCurrentRows < configPreviousRows) {
                input.context.Body.importedConfigs.configNotification = `Предупреждение: количество строк в последней загруженной конфигурации ${configCurrentRows} меньше чем в предыдущей ${configPreviousRows}. Убедитесь в корректности данных! `;

                if (input.context.Body.importedConfigs.status != "Danger") {
                    input.context.Body.importedConfigs.status = "Warning";
                }
            }

            if (configCurrentLastRow.importDocumentId == configPreviousLastRow?.importDocumentId) {
                input.context.Body.importedConfigs.configNotification = `Ошибка: возникла проблема при загрузке конфигурации. Найдены одинаковые Id документов загрузки ${configCurrentLastRow.importDocumentId}. Необходимо заново выполнить загрузку конфигурации! `;
                input.context.Body.importedConfigs.status = "Danger";
            }
        }

        if (configCurrentVersion > 2) {

            const configBeforePreviousVersion = configCurrentVersion - 2;
            const configBeforePrevious = configurations.filter(i => i.version == configBeforePreviousVersion);
            const configBeforePreviousRows = configBeforePrevious.length;
            const configBeforePreviousLastRow = configBeforePrevious[configBeforePreviousRows - 1];

            input.context.Body.importedConfigs.configBeforePrevious.rows = configBeforePreviousRows;
            input.context.Body.importedConfigs.configBeforePrevious.loadedBy = configBeforePreviousLastRow?.loadedBy;
            input.context.Body.importedConfigs.configBeforePrevious.loadDate = configBeforePreviousLastRow?.loadDate;
            input.context.Body.importedConfigs.configBeforePrevious.importDocumentId = configBeforePreviousLastRow?.importDocumentId;
        }

        if (input.context.Body.importedConfigs.status == 'Success') {
            input.context.Body.importedConfigs.configNotification += `Признаки неверно загруженной конфигурации не найдены.`;
        }

    }

    that.view.rebind();
}

function generateContext(input, self) {

    const allObjects = [];
    const allItems = [];

    const insuranceProduct = input.mainConditions?.insuranceProduct;
    const economicParameters = input.economicParameters ?? [];

    return {
        insuranceProduct,
        economicParameters,
        allObjects,
        allItems
    };
}

function generateCommonBody(input, self) {

    const context = this.generateContext(input, self);

    const commonBody = {
        insuranceProduct: context.insuranceProduct,
        economicParameters: context.economicParameters,
        objects: context.allObjects,
        items: context.allItems
    };

    return commonBody;
}

module.exports = {
    sourceFileFormatProductConfigurationDataConstants,
    getProductConfiguration,
    productConfigurationFilter,
    intAttributesArr,
    stringAttributesArr,
    dateAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    getProductConfigurationLastVersion,
    getUniversalConfiguration,
    getUniversalConfigurationInfo,
    issueDateStrConst,
    generateContext,
    generateCommonBody
};
