'use strict';

const { isGiftServices } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
* @errorCode {errorCode} giftServiceError
*/

module.exports = function validateGiftServices(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const selectedGiftServices = body?.giftServices?.selectedGiftServices?.giftServiceDescription;

    const applicationRoles = getValue(this, 'applicationContext.user.applicationRoles') || [];
    const isSkipGiftServicesValidationAPI = applicationRoles.some(t => t == 'SkipGiftServicesValidationAPI');

    if (typeof window == "undefined" && !isSkipGiftServicesValidationAPI) {

        if (isGiftServices(body) && !selectedGiftServices) {
            validationErrors.push({
                errorCode: "giftServiceError",
                errorDataPath: dataPath + '/selectedGiftServices'
            });
        }
    }

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (isGiftServices(body) && lifeInsuranceConstants.productGroupArray.STRATEGY_FOR_FIVE_VTB.includes(productCode) && !selectedGiftServices) {
        validationErrors.push({
            errorCode: "giftServiceError",
            errorDataPath: dataPath + '/selectedGiftServices'
        });
    }

    return validationErrors;
};
