module.exports = function aaServiceProviderCodeToClearButton(input) {

    delete input.context.Body.aaServiceProviderCodeTo;
    delete input.context.Body.aaServiceProviderNameTo;
    delete input.context.Body.aaNumberTo;
    delete input.context.Body.aaNameTo;
    delete input.context.Body.agentTabNumberTo;
    delete input.context.Body.sadNumberTo;
};
