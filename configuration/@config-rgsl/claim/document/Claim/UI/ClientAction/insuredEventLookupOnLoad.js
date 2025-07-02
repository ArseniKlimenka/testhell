'use strict';

const { insuredEventStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function insuredEventLookupOnLoad(input) {

    this.getLookup().getContext().viewContext.lockDocumentState = true;
    this.getLookup().setProtectedFields(['documentState']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                documentState: insuredEventStates.confirmed
            }
        }
    });

    this.getLookup().search();

};
