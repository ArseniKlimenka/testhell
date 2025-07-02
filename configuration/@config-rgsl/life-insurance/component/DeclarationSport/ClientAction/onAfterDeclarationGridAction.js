'use strict';

const { renumberDeclarationItems } = require('@config-rgsl/life-insurance/lib/declarationUtils');

module.exports = function onAfterDeclarationGridAction(input, ambientProperties) {
    input.affectedRow.agreementInsuredPerson = true;
    input.affectedRow.agreementPolicyHolder = true;
    renumberDeclarationItems(input.gridData);
};
