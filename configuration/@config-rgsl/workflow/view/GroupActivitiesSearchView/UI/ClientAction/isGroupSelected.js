module.exports = function isGroupSelected(input) {
    return !!input.context.request.data.criteria.groupCode;
};
