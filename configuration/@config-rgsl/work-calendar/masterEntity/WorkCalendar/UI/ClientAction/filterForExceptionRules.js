'use strict';

module.exports = function filterForExceptionRules(input) {
    return input.obj.ruleLevel === "exception";
};
