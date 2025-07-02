const AllocateUtils = require('@config-rgsl/contract/lib/AllocateUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function allocate(input) {

    const result = [];
    const productGroup = getValue(input, 'documentConfiguration.dimensions.productGroup');

    if (productGroup == lifeInsuranceConstants.productGroup.NSZ.descriptionRU) {

        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    if (productGroup == lifeInsuranceConstants.productGroup.DSZ.descriptionRU) {

        // same allocation logic for now
        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    if (productGroup == lifeInsuranceConstants.productGroup.ISZ.descriptionRU) {

        // same allocation logic for now
        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    if (productGroup == lifeInsuranceConstants.productGroup.CSZ.descriptionRU) {

        // same allocation logic for now
        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    if (productGroup == lifeInsuranceConstants.productGroup.DMS.descriptionRU) {

        // same allocation logic for now
        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    if (productGroup == lifeInsuranceConstants.productGroup.RISK.descriptionRU) {

        // same allocation logic for now
        result.push(AllocateUtils.allocateLifeInsuranceContract(input, this));
    }

    // for quotes and policies works with {}, but for Amendments need null...
    return result.some(item => item == null) ? null : result;

};
