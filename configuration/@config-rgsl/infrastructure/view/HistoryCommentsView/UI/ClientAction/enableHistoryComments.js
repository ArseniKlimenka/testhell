module.exports = function enableHistoryComments(input, ambientProperties) {

    const allowedGroups = ['operations'];

    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const isAllowedGroups = currentUserGroups.some(item => allowedGroups.includes(item.UserGroupCode));

    return isAllowedGroups;
};
