'use strict';

module.exports = function mapping(input) {

    const defaultApplicantCode = this.environmentVariables['rgsl.createCollectiveVlaimParams.defaultApplicantCode'];

    if (!defaultApplicantCode) {

        return;
    }

    return {
        data: {
            criteria: {
                partyCode: defaultApplicantCode,
            }
        }
    };
};
