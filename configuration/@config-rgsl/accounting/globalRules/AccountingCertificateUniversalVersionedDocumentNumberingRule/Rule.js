const { LocalDate } = require('@js-joda/core');

module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            'number': input.number
        };
    }

    const thisYear = LocalDate.now().year().toString();

    const sequenceName = 'ACC_IMPL.CERTIFICATE';
    const template = `СПРАВКА-${thisYear}%07d`;

    return {
        'sequenceName': sequenceName,
        'template': template
    };
};
