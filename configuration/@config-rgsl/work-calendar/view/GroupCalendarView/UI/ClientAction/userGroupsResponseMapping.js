'use strict';

module.exports = function userGroupsResponseMapping(input) {
    if (input.response.data && input.response.data.length > 0) {
        return input.response.data
            .filter(group => group.resultData.isGroupManager)
            .map(group => {
                return {
                    userGroupCode: group.resultData.groupCode,
                    userGroupName: group.resultData.groupNameLocalized
                };
            });
    }

    return [];
};
