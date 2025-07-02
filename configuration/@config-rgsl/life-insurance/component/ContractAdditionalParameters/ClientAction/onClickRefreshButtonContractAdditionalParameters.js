'use strict';

module.exports = function onClickRefreshButtonContractAdditionalParameters(input, ambientProperties) {

    const contractEntity = this.view?.getControlByElementId('ContractAdditionalParametersInlineViewId')?.getCurrentView();
    contractEntity?.reloadEntity();
};
