module.exports = function aaServiceProviderCodeClearButton(input) {
    delete input.data.request.data.criteria.aaServiceProviderCode;
    delete input.data.request.data.criteria.aaServiceProviderName;
    delete input.data.request.data.criteria.aaNumber;
};
