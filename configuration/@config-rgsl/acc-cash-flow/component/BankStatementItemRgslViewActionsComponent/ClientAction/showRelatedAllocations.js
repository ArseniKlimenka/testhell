'use strict';

module.exports = async function showRelatedAllocations(input, ambientProperties) {

    const bsi = input.context.selection[0].resultData;

    const searchRequest = {
        data: {
            criteria: {
                bankStatementItemId: bsi.bankStatementItemId,
            }
        }
    };

    ambientProperties.services.navigation.navigateToUrlInNewTab('/search;entity=SearchView;configurationCodeName=AllocationRgslView;version=1;redirect=true?searchRequest=' + this.view.encodeParam(JSON.stringify(searchRequest)));
};
