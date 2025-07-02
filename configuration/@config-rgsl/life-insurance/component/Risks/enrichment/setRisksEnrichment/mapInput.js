const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeConstant = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function mapping(input) {

    const isPolicyCreating = getValue(this, 'businessContext.relationName', 'nothing') == 'CreatePolicy';
    const productCode = getValue(this, 'businessContext.rootData.mainInsuranceConditions.insuranceProduct.productCode');

    if (isPolicyCreating && !isNoteProduct(productCode)) {
        return null;
    }

    const relationType = lifeConstant.relationType.mandatory;

    const output = {
        data: {
            criteria: {
                productCode,
                relationType
            }
        }
    };

    return output;
};
