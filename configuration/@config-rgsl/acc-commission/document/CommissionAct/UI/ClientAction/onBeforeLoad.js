const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = async function onBeforeLoad(input, ambientProperties) {
    const allProducts = await getProductConfiguration(ambientProperties);
    input.context.ClientViewModel.allProducts = allProducts;
};
