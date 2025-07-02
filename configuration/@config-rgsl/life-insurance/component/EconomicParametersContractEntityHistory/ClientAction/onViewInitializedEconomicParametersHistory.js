'use strict';

module.exports = function onViewInitializedEconomicParametersHistory(input) {

    const currentView = this.getCurrentView();
    const contractEntity = currentView?.getParentView()?.getContext();

    currentView.setSearchRequest({
        data: {
            criteria: {
                universalMasterEntityCode: contractEntity?.Code
            }
        }
    });

    currentView.search();

};
