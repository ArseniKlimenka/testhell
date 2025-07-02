'use strict';

module.exports = async function aaNumberOnLoadSearchView(input, ambientProperties) {
    const agentCode = input.data.request.data.criteria.aaServiceProviderCode;
    const lookup = this.getLookup();

    if (agentCode) {
        lookup.setSearchRequest({
            data: {
                criteria: {
                    agentServiceProviderCode: agentCode,
                }
            }
        });

        lookup.setProtectedFields(['agentServiceProviderCode'], true);
    }
};
