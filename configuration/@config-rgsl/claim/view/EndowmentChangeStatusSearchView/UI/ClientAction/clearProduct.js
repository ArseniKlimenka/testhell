module.exports = function clearProduct(input) {

    input.context.request.data.criteria.product = undefined;
};
