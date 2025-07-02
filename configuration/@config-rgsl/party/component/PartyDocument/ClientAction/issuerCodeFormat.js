'use strict';

const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');

module.exports = function issuerCodeFormat(input, ambientProperties) {

    input.context.issuerCode = partyDocumentLib.formatIssuerCode(input.context.issuerCode);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
