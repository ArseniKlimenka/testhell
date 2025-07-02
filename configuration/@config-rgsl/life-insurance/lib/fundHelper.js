/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatFundDataConstants = [{
    "fileFormat": 1,
    "formatName": "Excel",
    "dataSourceName": "FundXlsxFileLoaderDataSource"
}];

const intAttributesArr = [
    'rowNumber',
    'numberOfUnits'
];

const stringAttributesArr = [
    'documentNumber',
    'fundStatus'
];

const dateAttributesArr = [];

const floatAttributesArr = [
    'netAssetsAmount',
    'freeMoney',
    'unitCurrentAmount'
];

const booleanAttributesArr = [];
const objectAttributesArr = [];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [];
const issueDateStrConst = [];

async function getFund(ambientProperties, productCode, issueDate) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetFundImportDataSource',
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

async function getFundLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetFundImportDataSource',
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
    sourceFileFormatFundDataConstants,
    getFund,
    getFundLastVersion,
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
