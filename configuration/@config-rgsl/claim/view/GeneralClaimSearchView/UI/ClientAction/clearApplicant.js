'use strict';

module.exports = function clearApplicant(input) {

    if (input.context.request.data.criteria.applicantCode) {

        input.context.request.data.criteria.applicantCode = undefined;
        input.context.request.data.criteria.applicantFullName = undefined;
    }
};
