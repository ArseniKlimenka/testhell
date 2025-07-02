'use strict';

module.exports = function substitutesClearSubstituteUser(input) {

    const { data } = input;

    data.substituteUserId = undefined;
    data.substituteUserDisplayName = undefined;
};
