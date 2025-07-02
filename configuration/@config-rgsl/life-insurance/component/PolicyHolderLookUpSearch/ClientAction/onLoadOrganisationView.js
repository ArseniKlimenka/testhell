'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onLoadOrganisationView(input) {

    const paymentFrequencyCode = getValue(input, 'context.Body.basicConditions.paymentFrequency.paymentFrequencyCode');
    const participantType = getValue(input, 'data.participantType');

    this.getLookup().getContext().viewContext.paymentFrequencyCode = paymentFrequencyCode;
    this.getLookup().getContext().viewContext.participantType = participantType;
    this.getLookup().getContext().viewContext.lockPartyType = true;
    this.getLookup().setProtectedFields(['partyType']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                partyType: partyType.LegalEntity
            }
        }
    });

};
