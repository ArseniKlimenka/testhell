module.exports = function checkAndDisableAddingSameGroups(input) {
    const {
        gridData,
        affectedRow,
        operationType
    } = input;

    // disable adding of the same user groups
    if (operationType === 'Add' && (!affectedRow.code || gridData.filter(r => r.code == affectedRow.code).length > 0)) {
        return false;
    }

    return true;
};
