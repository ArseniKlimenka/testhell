
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function onRecipientReasonChanged(input) {

    const reason = getValue(input, 'rowContext.recipientReason.code');

    if (!reason) {

        delete input.data.fullName;
        delete input.data.partyCode;
        delete input.data.partyType;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
