/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatRateOfReturnRulesDataConstants = [
    {
        "fileFormat": 1,
        "formatName": "Excel",
        "dataSourceName": "RateOfReturnRulesXlsxFileLoaderDataSource"
    }
];

const stringAttributesArr = [
    'productCode',
    'strategyCode',
    'insuranceTerms',
    'currencyCode',
    'guaranteedIncome',
    'variant'
];

const dateAttributesArr = [];

const floatAttributesArr = [
    'rateOfReturn',
    'cashback',
    'rko',
    'participationCoeff',
    'manualRate',
];

const intAttributesArr = [];
const booleanAttributesArr = [];
const objectAttributesArr = [];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [];
const issueDateStrConst = [
    'issueDateStr'
];

async function getRateOfReturnRules(ambientProperties, productCode, strategyCode, issueDate, insuranceTerms, currencyCode, guaranteedIncome) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetRateOfReturnRulesDataSource',
        data: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    strategyCode,
                    issueDate,
                    insuranceTerms,
                    currencyCode,
                    guaranteedIncome
                }
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData);

    return result;
}

async function rateOfReturnRulesEnrich(productCode, issueDate) {

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/mainInsuranceConditions[GetCancellationRecipientsBankAccounts]']);
}

function rateOfReturnRulesFilter(isCollectivePolicy, productCode, strategyCode, issueDate, insuranceTerms, currencyCode, guaranteedIncome) {

    if (isCollectivePolicy) {
        return [];
    }

    const productConf = rateOfReturnRules?.filter(
        pc => pc.productCode == productCode &&
        pc.strategyCode ? pc.strategyCode == strategyCode : pc.strategyCode == null &&
        issueDate >= pc.issueDateFrom &&
        issueDate <= pc.issueDateTo &&
        pc.insuranceTerms == insuranceTerms &&
        pc.currencyCode == currencyCode &&
        pc.guaranteedIncome == guaranteedIncome
    );

    return productConf;

}

async function getRateOfReturnRulesLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetRateOfReturnRulesImportDataSource',
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
    }
    catch (err) {
        throwResponseError(err);
    }

    let lastVersion = 1;

    if (result?.data?.length > 0) {
        lastVersion = result.data[0].resultData.version;
    }

    return lastVersion;
}

module.exports = {
    sourceFileFormatRateOfReturnRulesDataConstants,
    getRateOfReturnRules,
    rateOfReturnRulesFilter,
    intAttributesArr,
    stringAttributesArr,
    dateAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    getRateOfReturnRulesLastVersion,
    issueDateStrConst
};
