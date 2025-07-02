'use strict';

const { prepareEntityLinkForActivity } = require('@config-system/workflow/lib/ActivityEntityLinkHelper');

module.exports = function prepareEntityLink(input) {
    return prepareEntityLinkForActivity(input.data);
};
