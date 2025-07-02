module.exports = function resultMapping(input) {

    if (input.length === 1) {
        input = input[0];

        return {
            organisationUnitCode: input.ORGANISATION_UNIT_CODE,
            fullName: input.FULL_NAME,
            orgUnitCode: input.CODE,
        };
    }
};

