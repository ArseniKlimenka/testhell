module.exports = function onChangeIncludedProductGroup(input, ambientProperties) {

    delete input.context.Body.products.included;

};
