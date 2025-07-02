'use strict';

const dateUtils = require('@config-system/infrastructure/lib/DateUtilsCore');

/**
 * @errorCode {errorCode} vatEmpty
 * @errorCode {errorCode} vatRateStartDateFirst
 * @errorCode {errorCode} vatRateStartDateOthers
 * @errorCode {errorCode} vatRateStartDateLaterDateIsGreater
 */

module.exports = function validation(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    if (input.useNds) {
        if ((input.vatRates?.length ?? 0) === 0) {
            validationErrors.push({
                errorCode: 'vatEmpty',
                errorDataPath: dataPath + '/vatRates',
            });
        } else {
            let previousDate;
            for (const index in input.vatRates) {
                const vatRateItem = input.vatRates[index];
                if (index == 0 && vatRateItem.startDate) {
                    validationErrors.push({
                        errorCode: 'vatRateStartDateFirst',
                        errorDataPath: dataPath + '/vatRates/' + index + '/startDate',
                    });
                }

                if (index != 0 && !vatRateItem.startDate) {
                    validationErrors.push({
                        errorCode: 'vatRateStartDateOthers',
                        errorDataPath: dataPath + '/vatRates/' + index + '/startDate',
                    });
                }

                if (previousDate && dateUtils.isAfterOrEqual(previousDate, vatRateItem.startDate)) {
                    validationErrors.push({
                        errorCode: 'vatRateStartDateLaterDateIsGreater',
                        errorDataPath: dataPath + '/vatRates/' + index + '/startDate',
                    });
                }

                previousDate = vatRateItem.startDate;
            }
        }
    }

    return validationErrors;
};
