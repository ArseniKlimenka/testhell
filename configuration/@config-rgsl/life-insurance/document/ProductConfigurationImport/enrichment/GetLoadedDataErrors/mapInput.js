'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                importDocumentId: this.businessContext.entityId
            }
        }
    };

};
