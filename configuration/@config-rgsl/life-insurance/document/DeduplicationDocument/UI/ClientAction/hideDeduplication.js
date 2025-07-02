'use strict';

module.exports = function hideDeduplication(input, ambientProperties) {

    const userGroups = ambientProperties.applicationContext.currentUser().getUserGroups() ?? [];
    const isAuditGroupAddedForUser = userGroups.filter(user => user.UserGroupCode == "audit")?.length > 0;

    return isAuditGroupAddedForUser;
};
