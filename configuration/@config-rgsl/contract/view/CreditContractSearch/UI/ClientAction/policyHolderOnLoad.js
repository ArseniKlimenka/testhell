'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function policyHolderOnLoad(input) {

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                partyType: partyType.NaturalPerson
            }
        }
    });

};
