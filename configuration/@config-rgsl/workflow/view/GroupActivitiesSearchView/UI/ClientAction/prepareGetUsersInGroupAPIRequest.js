module.exports = function prepareGetUsersInGroupAPIRequest(input, ambientProperties) {
    return {
        data: {
            groupCode: input.context.request.data.criteria.groupCode || null
        }
    };
};
