/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatStrategyConfDataConstants = [
    {
        "fileFormat": 1,
        "formatName": "Excel",
        "dataSourceName": "StrategyConfXlsxFileLoaderDataSource"
    }
];

const stringAttributesArr = [
    'productCode',
    'strategyCode',
    'currencyCode',
    'productDescription',
    'strategyDescriptionFull',
    'payOffDescription',
    'baseActiveDescription',
    'participationCoeffByPeriods',
    'barrier',
    'barrierAutoCall',
    'emitent',
    'payOffShortDescription',
    'toolType',
    'calculatingAgent',

];

const floatAttributesArr = [
    'participationCoeff',
    'optionPrice',
    'fixRate',
    'intialShare',
    'hedgeCost',
    'spreadBA',
    'measureToolNominal',
    'priceOfMeasureTool',
    'partOfPremiumForTool',
    'discount',
];

const intAttributesArr = [];
const booleanAttributesArr = [];
const objectAttributesArr = [];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [];
const dateAttributesArr = [];
const issueDateStrConst = ['issueDateStr'];

async function getStrategyConf(ambientProperties, productCode, strategyCode, issueDate, currencyCode) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetStrategyConfDataSource',
        data: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    issueDate,
                    currencyCode,
                    strategyCode
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

async function getStrategyConfEnrich(productCode, issueDate) {

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/mainInsuranceConditions[GetCancellationRecipientsBankAccounts]']);
}

function strategyConfFilter(strategyConf, isCollectivePolicy, productCode, issueDate) {

    if (isCollectivePolicy) {
        return strategyConf({ productCode: item.productCode, issueDate }) ?? {};
    }
    const productConf = strategyConf?.filter(pc => pc.productCode == productCode && issueDate >= pc.issueDateFrom && issueDate <= pc.issueDateTo)[0] ?? {};
    return productConf;

}

async function getStrategyConfLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetStrategyConfImportDataSource',
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
    sourceFileFormatStrategyConfDataConstants,
    getStrategyConf,
    strategyConfFilter,
    intAttributesArr,
    stringAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    getStrategyConfLastVersion,
    dateAttributesArr,
    issueDateStrConst
};
