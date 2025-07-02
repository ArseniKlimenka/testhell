'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { bankStatementItemStatusId, bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { callDataSource } = require('@config-rgsl/infrastructure/lib/CommonUtils');

/**
 * @translationKey {translationKey} XmlFileCreated
 * @translationKey {translationKey} XmlFileCreatedWithErrors
 * @translationKey {translationKey} XmlMessageExists
 * @translationKey {translationKey} Yes
 * @translationKey {translationKey} No
 */

module.exports = async function createRosfinmonitoringXml(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const translate = ambientProperties.services.translate.getSync;

    const selection = input.context.selection;
    const itemIds = selection.map(i => i.resultData.bankStatementItemId);
    const bankStatementItemId = itemIds[0];
    const paymentStatusId = selection.find(i => i.resultData.bankStatementItemId == bankStatementItemId).resultData.paymentStatusId;
    const direction = selection.find(i => i.resultData.bankStatementItemId == bankStatementItemId).resultData.direction;
    const isAllocated = paymentStatusId == bankStatementItemStatusId.PARTIALLY_ALLOCATED || paymentStatusId == bankStatementItemStatusId.ALLOCATED;
    const isNotAllocated = paymentStatusId == bankStatementItemStatusId.NOT_ALLOCATED && direction === bankStatementDirection.INCOMING;

    const xmlMessageExist = await checkXmlMessageAlreadyExists(bankStatementItemId, ambientProperties);

    if (xmlMessageExist) {
        const translate = (key) => ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName, key);
        const result = await ambientProperties.services.confirmationDialog.showConfirmation(translate('XmlMessageExists'), translate('Yes'), translate('No'), 3);

        if (!result) {
            return false;
        }
    }

    const request = {
        method: 'post',
        url: `api/rgsl/accounting/shared/cash-flow/rosfinmonitoring/create-xml`,
        data: {
            BankStatementItemIds: itemIds,
            IsAllocatedItems: isAllocated,
            SkipValidations: true
        }
    };

    let result;
    let showCorrectMessage = true;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);

        if (result.RosfinmonitoringErrorCodes?.length > 0) {

            showCorrectMessage = false;

            const errorCodes = result.RosfinmonitoringErrorCodes.map(err => {
                const obj = {};
                for (const prop in err) {
                    if (err[prop] !== null) {
                        obj[prop] = err[prop];
                    }
                }
                return obj;
            });

            let errorMessage = '';
            errorCodes.forEach(element => {
                errorMessage += `Id платежа ${element.BankStatementItemId}:`;
                delete element.BankStatementItemId;
                Object.values(element).forEach((val) => {
                    errorMessage += ` ${val}.`;
                });
            });

            const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'XmlFileCreatedWithErrors', { errorMessage: errorMessage });
            ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
        }

    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (showCorrectMessage) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.XmlFileCreated', "OK", "Cancel", ONLY_OK_BUTTON);
    }
    this.view.reloadEntity();
};

async function checkXmlMessageAlreadyExists(bankStatementItemId, ambientProperties) {
    const request = {
        data: {
            criteria: {
                bankStatementItemId: bankStatementItemId
            }
        }
    };

    const response = await callDataSource(ambientProperties, 'RosfinmonitoringXmlMessageDataSource', request);

    return response.data.length > 0;
}
