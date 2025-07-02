module.exports = async function initGroupTasksView(input, ambientProperties) {

    const getGroupsOfUserRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetGroupsOfUserDataSource',
        data: {
            data: {
                userId: ambientProperties.applicationContext.currentUser().getUserId()
            }
        }
    };

    const result = await ambientProperties.services.api.call(getGroupsOfUserRequest);
    let groupCode;
    if (result.data && result.data.length == 1) {
        groupCode = result.data[0].resultData.groupCode;
    }

    const view = this.getCurrentView();
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isVerificationUser = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'AttachmentVerificator');

    view.setProtectedFields([
        'hasAssigneeId',
        'userId',
        'activityType',
    ]);
    view.setSearchRequest({
        data: {
            criteria: {
                hasAssigneeId: true,
                userId: ambientProperties.applicationContext.currentUser().getUserId(),
                showVerification: isVerificationUser,
                activityType: 'State',
                activityStatus: 'Open',
                groupCode: groupCode,
                hideUnassignedTasks: true
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
