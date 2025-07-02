const rule = require('./rules/tariffConstants');

module.exports = function (input) {
    return rule(input.input) ?? {};
};
