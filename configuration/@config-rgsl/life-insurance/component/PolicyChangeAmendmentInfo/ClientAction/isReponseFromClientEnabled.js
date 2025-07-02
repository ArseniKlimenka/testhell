'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isReponseFromClientEnabled(input) {

    return input.context.State.Code === 'RequestToClient' && isSaveOperationAvailable(this.view);
};
