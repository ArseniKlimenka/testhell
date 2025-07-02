'use strict';

module.exports = function disableBranchDetails(input) {

    const branchId = input.context.Body?.branch?.branchId;

    return !branchId;
};
