'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onLoadPersonOrganisationView(input) {

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                partyType: partyType.LegalEntity
            }
        }
    });

};
