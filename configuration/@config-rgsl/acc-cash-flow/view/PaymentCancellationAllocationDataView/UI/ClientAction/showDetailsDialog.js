module.exports = function showDetailsDialog(input, ambientProperties) {
    const item = input.data.resultData;

    const searchRequest = {
        data: {
            criteria: {
                bankStatementItemId: item.bankStatementItemId,
            }
        }
    };

    ambientProperties.services.navigation.navigateToUrlInNewTab('/search;entity=SearchView;configurationCodeName=AllocationRgslView;version=1;redirect=true?searchRequest=' + this.view.encodeParam(JSON.stringify(searchRequest)));
};
