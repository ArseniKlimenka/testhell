'use strict';

module.exports = async function onLoadEconomicParametersSearchSearchView(input, ambientProperties) {

    try {

        this.view.startBlockingUI();

        const searchRequest = {
            data: {
                criteria: {
                    isLatest: true
                }
            }
        };

        this.view.setSearchRequest(searchRequest);
        this.view.search();

        this.view.stopBlockingUI();
    }

    catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }
};
