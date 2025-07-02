'use strict';

module.exports = function hidePolicyEconomics(input, ambientProperties) {

    return !input.context.Body.economicParameters;
};
