module.exports = function aaServiceProviderCodeClearButton(input) {
    delete input.context.Body.aaServiceProviderCode;
    delete input.context.Body.aaServiceProviderName;
    delete input.context.Body.aaNumber;
    delete input.context.Body.aaName;
};
