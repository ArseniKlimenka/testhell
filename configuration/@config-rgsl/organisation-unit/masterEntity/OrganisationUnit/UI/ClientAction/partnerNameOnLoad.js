'use strict';

module.exports = function partnerNameOnLoad(input) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().setProtectedFields(['serviceProviderType']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                serviceProviderType: "Partner"
            }
        }
    });

    this.getLookup().search();

};
