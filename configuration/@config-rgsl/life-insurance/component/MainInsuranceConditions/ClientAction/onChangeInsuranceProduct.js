const { handleOnChangeInsuranceProduct } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');


module.exports = async function onChangeInsuranceProduct(input, ambientProperties) {

    await handleOnChangeInsuranceProduct(input, ambientProperties, this);
};
