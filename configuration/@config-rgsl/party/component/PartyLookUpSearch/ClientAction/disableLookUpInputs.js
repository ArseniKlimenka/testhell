const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableLookUpInputs(input, ambientProperties) {

    if ((!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled()) && ambientProperties.configurationCodeName != 'LegalEntityBasicEdit') {

        return true;
    }

    const parentComponent = this.getParentComponent() || {};
    const isPolicyHolder = getValue(parentComponent, 'context.isPolicyHolder');

    if (isPolicyHolder) {

        return true;
    }


    return false;

};
