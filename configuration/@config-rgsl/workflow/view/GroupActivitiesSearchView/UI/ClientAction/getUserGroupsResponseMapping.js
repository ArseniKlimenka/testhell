module.exports = function getUserGroupsResponseMapping(input, ambientProperties) {
    if (input.response.data && input.response.data.length > 0) {
        input.context.viewContext.managerOfGroups = input.response.data
            .filter(group => group.resultData.isGroupManager)
            .map(group => group.resultData.groupCode);

        return input.response.data
            .map(group => {
                return {
                    userGroupCode: group.resultData.groupCode,
                    userGroupName: group.resultData.groupNameLocalized
                };
            });
    }

    return [];
};
