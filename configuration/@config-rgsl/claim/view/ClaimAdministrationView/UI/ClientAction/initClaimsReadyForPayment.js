'use strict';

module.exports = function initClaimsReadyForPayment(input, ambientProperties) {

    const currentUserId = ambientProperties.applicationContext.currentUser().getUserId();
    const view = this.getCurrentView();

    view.setSearchRequest({ data: { criteria: { assigneeId: currentUserId } } });
    view.setProtectedFields(['assigneeId']);
};
