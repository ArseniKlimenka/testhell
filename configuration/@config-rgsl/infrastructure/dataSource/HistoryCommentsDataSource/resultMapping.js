'use strict';

const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        author: input.AUTHOR,
        authorApplicationUserGroup: input.AUTHOR_APPLICATION_USER_GROUP,
        comment: input.COMMENT,
        createdOn: businessClock.convertFromBusinessTimeToUTC(input.CREATED_ON),
        id: input.COMMENT_ID,
        modifiedOn: businessClock.convertFromBusinessTimeToUTC(input.MODIFIED_ON),
        sequenceNumber: input.SEQ_NUMBER,
        originalCommentId: input.ORIGINAL_COMMENT_ID
    };
};
