const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');

module.exports = function fullNumberOnValueChanged(input, ambientProperties) {

    input.context.fullNumberFormatted = partyPhoneLib.phoneFormatting(input.context);

};
