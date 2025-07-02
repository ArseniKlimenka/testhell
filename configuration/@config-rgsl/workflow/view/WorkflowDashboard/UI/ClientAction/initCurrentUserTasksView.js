module.exports = function initCurrentUserTasksView(input, ambientProperties) {
    const view = this.getCurrentView();
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isVerificationUser = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'AttachmentVerificator');

    view.setProtectedFields([
        'assigneeId',
        'activityType',
    ]);
    view.setSearchRequest({
        data: {
            criteria: {
                assigneeId: ambientProperties.applicationContext.currentUser().getUserId(),
                showVerification: isVerificationUser,
                activityType: 'State',
                activityStatus: 'Open',
            },
            sort: [
                {
                    descending: true,
                    fieldName: 'createdDate',
                }
            ]
        }
    });
    view.search();
};
