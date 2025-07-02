'use strict';
module.exports = function registrationAgencyRequestMapping(input) {
    const request = {
        data: {
            criteria: {
                agencyCode: input.data.agencyCode ? input.data.agencyCode : input.data.code
            }
        }
    };
    return request;
};
