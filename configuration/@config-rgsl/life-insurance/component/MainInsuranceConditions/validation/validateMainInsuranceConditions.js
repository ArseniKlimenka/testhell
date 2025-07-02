const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
* @errorCode {errorCode} partnerIsRequired
* @errorCode {errorCode} productIsRequired
*/
module.exports = function validateMainInsuranceConditions(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const partnerCode = getValue(input, 'partner.partnerCode');
    const productCode = getValue(input, 'insuranceProduct.productCode');

    if (!partnerCode) {
        validationErrors.push({
            errorCode: "partnerIsRequired",
            errorDataPath: dataPath + '/partner/partnerDescription',
        });
    }

    if (!productCode) {
        validationErrors.push({
            errorCode: "productIsRequired",
            errorDataPath: dataPath + '/insuranceProduct',
        });
    }

    return validationErrors;
};
