'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onLoadGeneralPartySearchView(input) {

    this.getLookup().getContext().viewContext.lockPartyType = true;
    this.getLookup().setProtectedFields(['partyType']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                partyType: partyType.NaturalPerson
            }
        }
    });

};
