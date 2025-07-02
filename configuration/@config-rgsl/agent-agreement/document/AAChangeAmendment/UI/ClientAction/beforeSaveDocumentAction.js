'use strict';

const { checkAccPeriod } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');
const { updateEmptyInsuranceYearTo } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    const currentStartDate = input.context.Body.amendmentData?.changeAmendmentData?.validity?.startDate;

    if (currentStartDate) {

        const checkResult = await checkAccPeriod(currentStartDate, ambientProperties);

        if (!checkResult) {

            const message = `Невозможно сохранить документ. Дата начала находится в закрытом периоде!`;
            ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
            this.view.stopBlockingUI();
            return false;
        }
    }

    updateEmptyInsuranceYearTo(input);

    this.view.stopBlockingUI();
};
