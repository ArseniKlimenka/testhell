/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatStrategyInstrDataConstants = [
    {
        "fileFormat": 1,
        "formatName": "Excel",
        "dataSourceName": "StrategyInstrXlsxFileLoaderDataSource"
    }
];

const stringAttributesArr = [
    'productCode',
    'strategyCode',
    'productDescription',
    'strategyDescriptionFull'
];

const dateAttributesArr = [
    'purchaseDate',
    'dischargeDate',
    'didBeginDate',
    'didEndDate',
    'windowStartDate',
    'windowEndDate'
];

const floatAttributesArr = [];
const intAttributesArr = [];
const booleanAttributesArr = [];
const objectAttributesArr = [];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [];
const arrayDate = [
    'couponPeriods',
    'issueDateStr'
];

const couponPeriods = ['couponPeriods'];

async function getStrategyInstr(ambientProperties, productCode, strategyCode, issueDate, currencyCode) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetStrategyInstrDataSource',
        data: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    issueDate,
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

async function getStrategyInstrEnrich(productCode, issueDate) {

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/mainInsuranceConditions[GetCancellationRecipientsBankAccounts]']);
}

function strategyInstrFilter(strategyInstr, isCollectivePolicy, productCode, issueDate) {

    if (isCollectivePolicy) {
        return strategyInstr({ productCode: item.productCode, issueDate }) ?? {};
    }
    const productConf = strategyInstr?.filter(pc => pc.productCode == productCode && issueDate >= pc.issueDateFrom && issueDate <= pc.issueDateTo)[0] ?? {};
    return productConf;

}

async function getStrategyInstrLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetStrategyInstrImportDataSource',
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
    sourceFileFormatStrategyInstrDataConstants,
    getStrategyInstr,
    strategyInstrFilter,
    intAttributesArr,
    stringAttributesArr,
    dateAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    getStrategyInstrLastVersion,
    arrayDate,
    couponPeriods
};
