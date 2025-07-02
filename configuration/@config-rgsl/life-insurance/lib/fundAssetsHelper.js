/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatFundAssetsDataConstants = [{
    "fileFormat": 1,
    "formatName": "Excel",
    "dataSourceName": "FundAssetsXlsxFileLoaderDataSource"
}];

const intAttributesArr = [
    'rowNumber',
    'stockPurchasedNumber'
];

const stringAttributesArr = [
    'documentNumber',
    'assetType',
    'assetName',
    'isin',
    'assetType',
];

const dateAttributesArr = [];

const floatAttributesArr = [
    'assetCurrentShare',
    'assetPurchasePriceAvg',
    'assetAmountOnPurchaseTime',
    'assetPriceOnGenerationReportDate',
    'assetsAmountOnGenerationReportDate',
    'couponRate',
    'accumulatedCouponIncome',
];

const booleanAttributesArr = [];
const objectAttributesArr = [];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [];
const issueDateStrConst = [];

async function getFundAssets(ambientProperties, productCode, issueDate) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetFundAssetsImportDataSource',
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

async function getFundAssetsLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetFundAssetsImportDataSource',
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

module.exports = {
    sourceFileFormatFundAssetsDataConstants,
    getFundAssets,
    getFundAssetsLastVersion,
    intAttributesArr,
    stringAttributesArr,
    dateAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    issueDateStrConst
};
