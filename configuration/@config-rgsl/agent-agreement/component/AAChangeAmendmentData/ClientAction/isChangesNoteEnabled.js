'use strict';

module.exports = function isChangesNoteEnabled(input) {

    return input.context.State.Code === 'Draft';
};
