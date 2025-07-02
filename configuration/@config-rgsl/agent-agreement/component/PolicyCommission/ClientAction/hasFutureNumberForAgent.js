const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function hasFutureNumberForAgent(input, ambientProperties) {

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) {

        return true;
    }

    return false;
};
