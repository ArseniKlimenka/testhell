const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
* @errorCode {errorCode} needConfirmationPolicyHolder
* @errorCode {errorCode} needNotConfirmedItemPolicyHolder
* @errorCode {errorCode} needConfirmationInsuredPerson
* @errorCode {errorCode} needNotConfirmedItemInsuredPerson
*/
module.exports = function validateDeclarationMainConfirmation(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const declarationMain = body.declarationMain || [];
    const allItemsConfirmedPolicyHolder = declarationMain.every(item => item.agreementPolicyHolder == true);
    const allItemsConfirmedInsuredPerson = declarationMain.every(item => item.agreementInsuredPerson == true);
    const isConfirmedPolicyHolder = getValue(input, 'isConfirmedPolicyHolder', false);
    const isNotConfirmedPolicyHolder = getValue(input, 'isNotConfirmedPolicyHolder', false);
    const isConfirmedInsuredPerson = getValue(input, 'isConfirmedInsuredPerson', false);
    const isNotConfirmedInsuredPerson = getValue(input, 'isNotConfirmedInsuredPerson', false);
    const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const contractType = getValue(this, 'businessContext.configurationDimensions.contractType');
    const productGroup = getValue(this, 'businessContext.configurationDimensions.productGroup');
    const sequenceNumber = getValue(this, 'businessContext.sequenceNumber');
    const isCreditAmendment = productGroup == 'credit' && (contractType == 'Amendment' || sequenceNumber > 0);
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGNRETVTB].includes(productCode);

    if (!isConfirmedPolicyHolder && !isNotConfirmedPolicyHolder && !skipMigrated && !isCreditAmendment) {
        validationErrors.push({
            errorCode: "needConfirmationPolicyHolder",
            errorDataPath: '/declarationMainConfirmation/isConfirmedPolicyHolder'
        });
    }

    if (isNotConfirmedPolicyHolder && allItemsConfirmedPolicyHolder && !isEBMGRETVTB) {
        validationErrors.push({
            errorCode: "needNotConfirmedItemPolicyHolder",
            errorDataPath: '/declarationMain'
        });
    }

    if (!isPolicyHolder && !skipMigrated && !isCreditAmendment) {
        if (!isConfirmedInsuredPerson && !isNotConfirmedInsuredPerson) {
            validationErrors.push({
                errorCode: "needConfirmationInsuredPerson",
                errorDataPath: '/declarationMainConfirmation/isConfirmedInsuredPerson'
            });
        }

        if (isNotConfirmedInsuredPerson && allItemsConfirmedInsuredPerson) {
            validationErrors.push({
                errorCode: "needNotConfirmedItemInsuredPerson",
                errorDataPath: '/declarationMain'
            });
        }
    }

    return validationErrors;

};
