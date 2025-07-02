const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const productCode = input?.body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isECOFVTB = [lifeInsuranceConstants.product.ECOFPVTB, lifeInsuranceConstants.product.ECOFVVTB].includes(productCode);

    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);

    const output = {
        policy,
        isECOFVTB
    };

    return output;
};
