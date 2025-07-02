'use strict';

const { periodType } = require('@config-rgsl/acc-base/lib/accConsts');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PeriodSuccessfullyClosed
 */

module.exports = async function closePeriod(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;
    const selection = input.context.selection;

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/periods/close',
        data: {
            periodIds: selection.map(_ => _.resultData.periodId),
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
        if (selection.some(_ => _.resultData.periodTypeId === periodType.REVALUATION)) {
            const dates = selection.filter(_ => _.resultData.periodTypeId === periodType.REVALUATION).map(_ => _.resultData.endDate);
            const newRevaluationDate = dateTimeUtils.getMaxOfDates(dates);
            await startRevaluationEtl('FullRevaluationETLService', newRevaluationDate, ambientProperties);
            // await startRevaluationEtl('FullRevaluationOfInvoicedCommissionETLService', ambientProperties);
            ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PeriodSuccessfullyClosed', 'OK', 'Cancel', ONLY_OK_BUTTON);
        }
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    this.view.search();
};

async function startRevaluationEtl(etlService, newRevaluationDate, ambientProperties) {

    const request = {
        method: 'post',
        url: `api/core/shared/etl-services/${etlService}/1`,
        data: {
            data: {
                newRevaluationDate,
            }
        }
    };

    await ambientProperties.services.api.call(request);
}
