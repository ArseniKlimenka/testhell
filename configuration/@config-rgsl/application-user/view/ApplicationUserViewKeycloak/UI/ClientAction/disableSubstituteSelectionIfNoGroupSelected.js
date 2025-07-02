module.exports = function disableSubstituteSelectionIfNoGroupSelected(input) {
    if (!input.data.name) {
        return true;
    }

    return false;
};
