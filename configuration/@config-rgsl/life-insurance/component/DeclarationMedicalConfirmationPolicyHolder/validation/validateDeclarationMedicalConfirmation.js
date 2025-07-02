'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');


/**
* @errorCode {errorCode} needConfirmation
* @errorCode {errorCode} needNotConfirmedItem
* @errorCode {errorCode} needConfirmationERC
*/
module.exports = function validateDeclarationMedicalConfirmation(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const declarationMedicalPolicyHolder = body.declarationMedicalPolicyHolder || [];

    if (declarationMedicalPolicyHolder.length == 0) { return validationErrors; }

    const allItemsConfirmed = declarationMedicalPolicyHolder.every(item => item.agreement == true);
    const isConfirmed = getValue(input, 'isConfirmed', false);
    const isNotConfirmed = getValue(input, 'isNotConfirmed', false);
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    let skipByProductCode = [
        ...productGroupArray.GENCHK,
        ...productGroupArray.MEDPRO
    ].includes(productCode);

    const risks = getValue(body, 'risks', []);
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);

    if (isWCENOAS && risks.length < 4) {
        skipByProductCode = true;
    }

    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMGNRETVTB].includes(productCode);

    if (!isConfirmed && !isNotConfirmed && !skipMigrated && !skipByProductCode) {
        validationErrors.push({
            errorCode: "needConfirmation",
            errorDataPath: '/declarationMedicalConfirmationPolicyHolder/isConfirmed'
        });
    }
    else if (isNotConfirmed) {
        if (['ERC', 'ERC2'].includes(productCode)) {
            validationErrors.push({
                errorCode: "needConfirmationERC",
                errorDataPath: '/declarationMedicalConfirmationPolicyHolder/isConfirmed'
            });
        }
        else if (allItemsConfirmed && !isEBMGRETVTB) {
            validationErrors.push({
                errorCode: "needNotConfirmedItem",
                errorDataPath: '/declarationMedicalPolicyHolder'
            });
        }
    }

    return validationErrors;

};
