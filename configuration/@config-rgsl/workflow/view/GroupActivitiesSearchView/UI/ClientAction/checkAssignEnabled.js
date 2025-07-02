module.exports = function checkAssignEnabled(input, ambientProperties) {
    const isManager = input && input.context && input.context.request && input.context.request.data && input.context.request.data.criteria && input.context.request.data.criteria.groupCode
        && input.context.viewContext.managerOfGroups.includes(input.context.request.data.criteria.groupCode);

    return isManager;
};
