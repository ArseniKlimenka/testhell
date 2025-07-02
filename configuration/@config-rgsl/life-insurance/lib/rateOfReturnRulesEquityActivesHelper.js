/* eslint no-undef: "off"*/

'use strict';

const sourceFileFormatRateOfReturnRulesEquityActivesDataConstants = [
    {
        "fileFormat": 1,
        "formatName": "Excel",
        "dataSourceName": "RateOfReturnRulesEquityActivesXlsxFileLoaderDataSource"
    }
];

const stringAttributesArr = [
    'productCode'
];

const dateAttributesArr = [];

const floatAttributesArr = [
    'manualRate',
    'investmentFrequency',
    'mf',
    'costsOpenContracts',
    'rko',
];

const intAttributesArr = [];
const booleanAttributesArr = [
    'isStandardContractConditions',
    'isCoordinationUDRequired'
];
const objectAttributesArr = [
    'commWithdrawalFunds'
];
const objectWrongAttributesArr = [];
const arrayAttributesArr = [
    'insuranceTerms'
];
const issueDateStrConst = [
    'issueDateStr'
];

async function getRateOfReturnRulesEquityActives(body, ambientProperties) {

    const issueDate = body?.basicConditions?.issueDate;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const insuranceTerms = body?.basicConditions?.insuranceTerms;

    let result = [];

    if (productCode && issueDate) {

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetRateOfReturnRulesEquityActivesDataSource',
            data: {
                data: {
                    criteria: {
                        maxVersion: true,
                        productCode,
                        issueDate,
                        insuranceTerms
                    }
                }
            }
        };

        const resultData = await ambientProperties.services.api.call(request);
        result = resultData.data.map(_ => _.resultData);
    }

    return result;
}

async function getRateOfReturnRulesEquityActivesLastVersion(ambientProperties) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/GetRateOfReturnRulesEquityActivesImportDataSource',
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
    sourceFileFormatRateOfReturnRulesEquityActivesDataConstants,
    getRateOfReturnRulesEquityActives,
    intAttributesArr,
    stringAttributesArr,
    dateAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    getRateOfReturnRulesEquityActivesLastVersion,
    issueDateStrConst
};
