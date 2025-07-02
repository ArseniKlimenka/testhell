module.exports = function initUserLookupToGroupUsersOnly(input) {
    const view = this.getLookup();

    view.setProtectedFields([
        'userGroupCode'
    ]);
    view.setSearchRequest({
        data: {
            criteria: {
                userGroupCode: input.data.code
            }
        }
    });
};
