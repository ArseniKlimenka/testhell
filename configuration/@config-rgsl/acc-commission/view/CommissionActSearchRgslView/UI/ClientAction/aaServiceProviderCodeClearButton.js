module.exports = function aaServiceProviderCodeClearButton(input) {
    delete input.data.request.data.criteria.aaServiceProviderCode;
    delete input.data.request.data.criteria.aaServiceProviderName;
    input.data.request.data.criteria.aaNumbers = [];
};
