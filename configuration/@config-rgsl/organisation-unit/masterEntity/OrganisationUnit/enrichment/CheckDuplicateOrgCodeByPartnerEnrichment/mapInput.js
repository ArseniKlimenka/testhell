'use strict';

module.exports = function mapInput(input) {

    if (!input.code) {

        return;
    }

    return {
        data: {
            criteria: {
                code: input.code,
                parentCode: input.parentCode,
                partnerCode: input.partnerCode,
                orgUnitCode: input.orgUnitCode
            }
        }
    };

};
