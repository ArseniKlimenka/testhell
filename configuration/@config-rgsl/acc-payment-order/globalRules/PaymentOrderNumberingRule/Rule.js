const {
    LocalDate
} = require('@js-joda/core');
module.exports = function getnext(input) {
    const thisYear = LocalDate.now().year();
    return {
        sequenceName: `ACC.PAYMENT_ORDER.${thisYear}`,
        template: `${thisYear}_%08d`
    };
};
