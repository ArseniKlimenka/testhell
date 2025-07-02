'use strict';

module.exports = function disableOperationsOnInheritedRules(input) {
    const { affectedRow } = input;

    if (affectedRow.sourceCalendarCode) {
        return {
            edit: false,
            delete: false
        };
    }

    return {};
};
