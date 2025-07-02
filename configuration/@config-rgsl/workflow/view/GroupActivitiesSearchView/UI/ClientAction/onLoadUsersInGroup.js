'use strict';

module.exports = async function onLoadUsersInGroup(input, ambientProperties) {

    this.getLookup().getContext().viewContext.lockUserGroupCode = true;
    this.getLookup().setProtectedFields(['userGroupCode']);

    if (input.context.request.data.criteria.groupCode) {
        this.getLookup().setSearchRequest({
            data: {
                criteria: {
                    userGroupCode: input.context.request.data.criteria.groupCode
                }
            }
        });

        this.getLookup().search();
    }

};
