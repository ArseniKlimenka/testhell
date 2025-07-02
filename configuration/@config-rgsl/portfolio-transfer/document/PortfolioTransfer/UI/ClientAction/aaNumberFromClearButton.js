module.exports = function aaNumberFromClearButton(input) {

    delete input.context.Body.aaNumberFrom;
    delete input.context.Body.aaNameFrom;
    delete input.context.Body.agentTabNumberFrom;
};
