'use strict';

module.exports = function onLoad(input) {

    input.context.request.data.criteria.isNotCancelled = true;
    input.context.request.data.criteria.isNotDraft = true;
};
