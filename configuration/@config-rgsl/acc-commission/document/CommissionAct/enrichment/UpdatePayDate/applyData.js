const { ZonedDateTime, DateTimeFormatter } = require('@js-joda/core');

module.exports = function apply(body) {

    if (this.businessContext.transitionCodeName === 'Approved_To_CompletedPaidNegative') {
        const date = ZonedDateTime.parse(this.businessContext.businessTime);
        body.payDate = date.format(DateTimeFormatter.ISO_LOCAL_DATE);

    } else if (this.businessContext.transitionCodeName === 'CompletedPaidNegative_To_Approved') {
        body.payDate = undefined;
    }
};
