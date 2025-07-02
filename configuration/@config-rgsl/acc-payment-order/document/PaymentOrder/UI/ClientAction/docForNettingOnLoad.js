'use strict';

module.exports = function docForNettingOnLoad(input) {

    const lookUp = this.getLookup();
    const protectedFields = [];

    lookUp.setProtectedFields(protectedFields, true);

    lookUp.setSearchRequest({
        data: {
            criteria: {
            }
        }
    });
};
