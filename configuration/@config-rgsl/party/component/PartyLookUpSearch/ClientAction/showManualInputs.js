const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showManualInputs(input, ambientProperties) {

    const contractType = getValue(input, 'context.Dimensions.contractType');
    return ["Quote", "Policy"].includes(contractType);

};
