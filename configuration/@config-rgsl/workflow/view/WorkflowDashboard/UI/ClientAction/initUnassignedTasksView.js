const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function initUnassignedTasksView(input, ambientProperties) {

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

    view.getContext().viewContext.businessMode = 'unassigned-tasks';
    view.setProtectedFields([
        'hasAssigneeId',
        'userId',
        'activityType',
    ]);
    view.setSearchRequest({
        data: {
            criteria: {
                hasAssigneeId: false,
                userId: ambientProperties.applicationContext.currentUser().getUserId(),
                showVerification: isVerificationUser,
                activityType: 'State',
                activityStatus: 'Open',
                groupCode: groupCode,
                contractStates: isVerificationUser ? [policyState.Activated] : undefined,
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
