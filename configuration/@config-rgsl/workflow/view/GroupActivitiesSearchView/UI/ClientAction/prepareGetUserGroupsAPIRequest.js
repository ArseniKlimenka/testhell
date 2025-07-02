module.exports = function prepareGetUserGroupsAPIRequest(input, ambientProperties) {
    return {
        data: {
            userId: ambientProperties.applicationContext.currentUser().getUserId()
        }
    };
};
