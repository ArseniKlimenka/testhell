module.exports = function resultMapping(input) {
    return {
        groupCode: input.GroupCode,
        groupName: input.GroupName,
        isGroupManager: input.IsGroupManager
    };
};
