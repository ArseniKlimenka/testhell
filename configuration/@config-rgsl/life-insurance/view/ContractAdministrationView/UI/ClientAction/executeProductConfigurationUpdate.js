'use strict';

const { modificationTypes } = require('@config-rgsl/life-insurance/lib/contractModificationHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function executeProductConfigurationUpdate(input, ambientProperties) {

    const contractNumber = input.context.Body.contractNumber;
    const productConfigurationVersion = input.context.Body.productConfigurationVersion;
    const productConfigurationLastVersion = input.context.Body.productConfigurationLastVersion;
    const modificationType = modificationTypes.productConfiguration;
    const productCode = input.context.Body.productCode;
    const issueDate = input.context.Body.issueDate;
    const contractType = input.context.Body.contractType;
    const isQuote = contractType == 'Quote';
    const contractTypeText = isQuote ? 'котировке' : 'договору';

    if (!productConfigurationLastVersion) {

        ambientProperties.services.confirmationDialog.showWarning(`Для продукта с кодом ${productCode} на дату заключения ${DateTimeUtils.formatDate(issueDate, DateTimeUtils.DateFormats.CALENDAR)} конфигурация не найдена в последней версии конфигурации продуктов!`, 'OK', 'OK', 2);
    }

    if (!contractNumber || !productConfigurationVersion) {

        ambientProperties.services.confirmationDialog.showError('Укажите все необходимые параметры!', 'OK', 'OK', 2);
        return;
    }

    if (isNaN(+productConfigurationVersion)) {
        ambientProperties.services.confirmationDialog.showError('Версия конфигурации продуктов должно быть числом', 'OK', 'OK', 2);
        return;
    }

    this.view.startBlockingUI();

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/GeneralUpdateContract/1`,
        data: {
            data: {
                contractNumber,
                productConfigurationVersion: +productConfigurationVersion,
                modificationType
            }
        }
    };

    await ambientProperties.services.api.call(request)
        .then(undefined)
        .catch(error => {
            this.view.stopBlockingUI();
            throw error.error?.data?.errorResponse?.message ?? error.message;
        });

    ambientProperties.services.confirmationDialog.showConfirmation(`Конфигурация продукта по ${contractTypeText} ${contractNumber} успешно обновлена`, 'OK', 'OK', 2);
    this.view.stopBlockingUI();
};

