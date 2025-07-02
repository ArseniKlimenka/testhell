'use strict';

module.exports = function filterSubstitutes(input) {
    const {data, obj} = input;

    return (!data.criteria.selectedUser || obj.applicationUserId == data.criteria.selectedUser.userId);
};
