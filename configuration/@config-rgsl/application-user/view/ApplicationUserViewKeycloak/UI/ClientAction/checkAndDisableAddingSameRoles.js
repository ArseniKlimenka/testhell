module.exports = function checkAndDisableAddingSameRoles(input) {
    const {
        gridData,
        affectedRow,
        operationType
    } = input;

    // disable adding of the same application roles
    if (operationType === 'Add' && (!affectedRow.codeName || gridData.filter(r => r.codeName == affectedRow.codeName && !r.isAssignedFromGroup).length > 0)) {
        return false;
    }

    return true;
};
