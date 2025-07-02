'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                partyCode: input.applicantPartyCode
            }
        }
    };

    return output;
};
