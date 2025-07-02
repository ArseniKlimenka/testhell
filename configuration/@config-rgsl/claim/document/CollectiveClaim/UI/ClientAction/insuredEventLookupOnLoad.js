'use strict';

const { insuredEventStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function insuredEventLookupOnLoad(input) {

    this.getLookup().getContext().viewContext.lockDocumentState = true;
    this.getLookup().setProtectedFields(['documentState', 'contractConfName']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                documentState: insuredEventStates.confirmed,
                contractConfName: 'CollectiveLifeInsurancePolicy'
            }
        }
    });

    this.getLookup().search();

};
