const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const ruleDescription = input?.body?.insuranceRules?.ruleDescription;

    return {
        ruleDescription
    };

};
