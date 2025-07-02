'use strict';

module.exports = function clearAgent(input) {

    if (input.context.request.data.criteria.agentServiceProviderCode) {

        input.context.request.data.criteria.agentServiceProviderCode = undefined;
        input.context.request.data.criteria.agentName = undefined;
    }
};
