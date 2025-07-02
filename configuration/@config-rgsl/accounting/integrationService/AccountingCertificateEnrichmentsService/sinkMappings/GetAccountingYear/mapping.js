'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { highlightErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { maxAccountingYearOffset } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const accountingYear = input.body?.accountingYear?.year;

    if (accountingYear > dateUtils.yearNow() + maxAccountingYearOffset) {
        const errorMsg = `E: Отчетный год должен быть не больше чем +${maxAccountingYearOffset} года к текущему году`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    if (accountingYear && !input.isContractEnrichOnly && !sinkExchange.isDuplicate) {

        return {
            input: {
                data: {
                    criteria: {
                        year: accountingYear
                    }
                }
            }
        };
    }
};
