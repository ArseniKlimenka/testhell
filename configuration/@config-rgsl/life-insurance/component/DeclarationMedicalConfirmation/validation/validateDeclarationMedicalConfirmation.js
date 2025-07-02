'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

/**
* @errorCode {errorCode} needConfirmation
* @errorCode {errorCode} needNotConfirmedItem
* @errorCode {errorCode} needConfirmationERC
* @errorCode {errorCode} policyHolderNotRequiredCriteria
*/
module.exports = function validateDeclarationMedicalConfirmation(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const declarationMedical = body.declarationMedical || [];
    const allItemsConfirmed = declarationMedical.every(item => item.agreement == true);
    const isMainNotConfirmed = body?.declarationMainConfirmation?.isNotConfirmedPolicyHolder;

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
    const contractType = getValue(this, 'businessContext.configurationDimensions.contractType');
    const productGroup = getValue(this, 'businessContext.configurationDimensions.productGroup');
    const sequenceNumber = getValue(this, 'businessContext.sequenceNumber');
    const isCreditAmendment = productGroup == 'credit' && (contractType == 'Amendment' || sequenceNumber > 0);
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGNRETVTB].includes(productCode);

    if (!isConfirmed && !isNotConfirmed && !skipMigrated && !skipByProductCode && !isCreditAmendment) {
        validationErrors.push({
            errorCode: "needConfirmation",
            errorDataPath: '/declarationMedicalConfirmation/isConfirmed'
        });
    }
    else if (isNotConfirmed) {
        if (['ERC', 'ERC2'].includes(productCode)) {
            validationErrors.push({
                errorCode: "needConfirmationERC",
                errorDataPath: '/declarationMedicalConfirmation/isConfirmed'
            });
        }
        else if (allItemsConfirmed && !isEBMGRETVTB) {
            validationErrors.push({
                errorCode: "needNotConfirmedItem",
                errorDataPath: '/declarationMedical'
            });
        }
    }

    if (isEBMGRETVTB && (isMainNotConfirmed || isNotConfirmed)) {
        validationErrors.push({
            errorCode: "policyHolderNotRequiredCriteria",
            errorDataPath: '/declarationMedicalConfirmation'
        });
    }

    return validationErrors;

};
