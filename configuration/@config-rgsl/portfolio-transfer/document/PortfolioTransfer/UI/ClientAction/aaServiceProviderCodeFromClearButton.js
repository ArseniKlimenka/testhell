module.exports = function aaServiceProviderCodeFromClearButton(input) {

    delete input.context.Body.aaServiceProviderCodeFrom;
    delete input.context.Body.aaServiceProviderNameFrom;
    delete input.context.Body.aaNumberFrom;
    delete input.context.Body.aaNameFrom;
    delete input.context.Body.agentTabNumberFrom;
    delete input.context.Body.sadNumberFrom;
};
