const rule = require('./rules/ePolicytConfiguration');

module.exports = function (input) {
    return rule(input.input) ?? {};
};
