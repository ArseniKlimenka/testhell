'use strict';

module.exports = async function showRelatedAccountingEntries(input, ambientProperties) {

    const bsi = input.context.selection[0].resultData;

    const searchRequest = {
        data: {
            criteria: {
                bankStatementItemId: bsi.bankStatementItemId,
                enableGrouping: true,
            }
        }
    };

    ambientProperties.services.navigation.navigateToUrlInNewTab('/search;entity=SearchView;configurationCodeName=RelatedAccountingEntriesView;version=1;redirect=true?searchRequest=' + this.view.encodeParam(JSON.stringify(searchRequest)));
};
