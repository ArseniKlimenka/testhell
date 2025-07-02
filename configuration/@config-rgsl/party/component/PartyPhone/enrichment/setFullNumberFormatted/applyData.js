const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');

module.exports = function applyData(partyPhone) {

    partyPhone.fullNumberFormatted = partyPhoneLib.phoneFormatting(partyPhone);

};
