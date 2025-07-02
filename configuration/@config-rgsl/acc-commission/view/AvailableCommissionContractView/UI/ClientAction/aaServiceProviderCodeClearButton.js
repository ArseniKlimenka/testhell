module.exports = function aaServiceProviderCodeClearButton(input) {
    delete input.data.request.data.criteria.aaServiceProviderCode;
};
