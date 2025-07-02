module.exports = function onChangeLineProductGroup(input, ambientProperties) {

    delete input.context.request.data.criteria.lineProducts;

};
