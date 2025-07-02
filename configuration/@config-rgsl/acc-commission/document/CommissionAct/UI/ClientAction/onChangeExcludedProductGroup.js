module.exports = function onChangeExcludedProductGroup(input, ambientProperties) {

    delete input.context.Body.products.excluded;

};
