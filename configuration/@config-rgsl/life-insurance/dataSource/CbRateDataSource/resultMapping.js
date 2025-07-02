
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    return {
        cbRateDate: input.RATE_DATE ? dateUtils.formatDate(input.RATE_DATE) : undefined,
        cbRate: input.RATE
    };
};
