const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

module.exports = function rule(input) {

    const validationErrors = [];

    flowRulesHelper.notBeCompleted(input, validationErrors);

    return validationErrors;

};
