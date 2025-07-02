module.exports = function onLoadFiltersContent(input) {
    input.context.request.data.criteria.isNotCancelled = true;
};
