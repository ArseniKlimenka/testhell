'use strict';

const { checkAccPeriod } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');

module.exports = async function validateAccPeriod(input, ambientProperties) {

    this.view.startBlockingUI();

    const currentStartDate = input.context.Body.amendmentData?.changeAmendmentData?.validity?.startDate;

    if (currentStartDate) {

        const checkResult = await checkAccPeriod(currentStartDate, ambientProperties);

        if (!checkResult) {

            this.view.stopBlockingUI();
            throw 'Невозможно активировать документ. Дата начала находится в закрытом периоде!';
        }
    }

    this.view.stopBlockingUI();
};
