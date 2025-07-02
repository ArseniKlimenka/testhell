'use strict';

module.exports = function mapping(input) {

    const commonBody = {
        masterParty: input.masterParty,
        duplicateParty: input.duplicateParty,
        updatedDocuments: input.updatedDocuments
    };

    return commonBody;

};

