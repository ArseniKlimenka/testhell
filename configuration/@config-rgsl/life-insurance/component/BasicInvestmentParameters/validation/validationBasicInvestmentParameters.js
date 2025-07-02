const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkDRPKCommissionIncrease } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
/**
 * @errorCode {errorCode} investmentStrategyIsRequired
 * @errorCode {errorCode} managingDirectorDRPKAttachmentIsRequired
 */

module.exports = function validationBasicInvestmentParameters(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const attachmentsPackage = body.attachmentsPackage ?? [];
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isReinvestProducts = productGroupArray.REINVEST_PRODUCT_FOR_SKIP_DRPK.includes(productCode);
    const isDRPKCaseOfIncrease = checkDRPKCommissionIncrease(productCode, body?.commission?.policyCommissionItems);

    const investmentStrategyCode = input?.investmentStrategy?.investmentStrategyCode;
    const rateOfReturn = input?.rateOfReturn;

    if (!investmentStrategyCode) {
        validationErrors.push({
            errorCode: "investmentStrategyIsRequired",
            errorDataPath: dataPath + '/investmentStrategy'
        });
    }

    if (!isReinvestProducts && rateOfReturn && !attachmentsPackage.some(item => item.attachmentType == 'managingDirectorDRPK') && !isDRPKCaseOfIncrease) {
        validationErrors.push({
            errorCode: "managingDirectorDRPKAttachmentIsRequired"
        });
    }

    return validationErrors;

};
