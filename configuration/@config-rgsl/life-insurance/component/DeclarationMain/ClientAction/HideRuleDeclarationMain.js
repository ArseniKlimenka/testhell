const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

module.exports = function HideRuleDeclarationMain (input) {
    return getValue(input, 'rootContext.Body.insuredPerson.isPolicyHolder');
};
