'use strict';

module.exports = function showAttachmentsTab(input) {

    if (!input.context.IsSaved) { return false; }

    return true;

};
