'use strict';

module.exports = async function DeduplicationDocumentOnLoad(input, ambientProperties) {

    this.view.getControlByElementId('ai-operations-control').hideElement();
    const userGroups = ambientProperties.applicationContext.currentUser().getUserGroups() ?? [];
    const isAuditGroupAddedForUser = userGroups.filter(user => user.UserGroupCode == "audit")?.length > 0;

    if (isAuditGroupAddedForUser) {
        ambientProperties.services.confirmationDialog.showNotification(`У пользователя нет прав для выполнения данного действия`, 'OK', 'OK', 1);
    }

    if (input.context?.State?.Code == 'Issued') {
        this.view.disableAllElements();
    }

};
