module.exports = function checkAllowedOperationsOnRows(input) {
    const { affectedRow } = input;

    return {
        delete: !affectedRow.isAssignedFromGroup
    };
};
