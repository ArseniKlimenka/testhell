'use strict';

module.exports = function filterForGeneralRules(input) {
    return input.obj.ruleLevel === "general";
};
