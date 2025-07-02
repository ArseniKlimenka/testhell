module.exports = function resultMapping(input) {

    return {
        aaNumber: input.AA_NUMBER,
        lastLoadDate: input.LAST_LOAD_DATE,
        aaAmendmentStartDate: input.AA_AMENDMENT_START_DATE,
    };
};
