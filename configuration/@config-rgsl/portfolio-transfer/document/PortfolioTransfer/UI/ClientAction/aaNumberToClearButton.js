module.exports = function aaNumberToClearButton(input) {

    delete input.context.Body.aaNumberTo;
    delete input.context.Body.aaNameTo;
    delete input.context.Body.agentTabNumberTo;
};
