const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showSaveButton(input, ambientProperties) {

    return isSaveOperationAvailable(this.view);

};
