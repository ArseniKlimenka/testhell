const { LocalDate } = require('@js-joda/core');

module.exports = function getnext(input) {

    if (input.number) {

        return {
            "number": input.number
        };
    }

    const thisYear = LocalDate.now().year().toString().substring(2);

    return {
        sequenceName: `CLM.CLAIM_NUMBER.${thisYear}`,
        template: `УБ-%07d-${thisYear}`
    };
};
