const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableAdditionalConditions(input) {

    return isSaveOperationAvailable(this.view);
};
