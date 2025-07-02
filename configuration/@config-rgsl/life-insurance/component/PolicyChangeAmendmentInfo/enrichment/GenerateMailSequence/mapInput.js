
const { LocalDate } = require('@js-joda/core');

module.exports = function mapping(input) {

    const currentYear = LocalDate.now().year();

    return {
        data: {
            sequenceName: `99-08-421-04.${currentYear}`
        }
    };
};
