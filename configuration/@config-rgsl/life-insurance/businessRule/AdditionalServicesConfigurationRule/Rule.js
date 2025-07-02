const rule = require('./rules/additionalServicesConfiguration');

module.exports = function (input) {
    return rule(input.input) ?? {};
};
