module.exports = function historyTabVisibility(input, ambientProperties) {

    const isSaved = input.context.IsSaved;
    return isSaved;
};
