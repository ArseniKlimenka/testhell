'use strict';

const { getRateOfReturnRulesLastVersion } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

module.exports = async function onChangeVersion(input, ambientProperties) {

    const version = input.data.version;

    if (!version) {

        const notificationMessage = 'Версия конфигурации должна быть заполнена и иметь значение больше 0.';
        ambientProperties.services.confirmationDialog.showWarning(notificationMessage, 'ОК', 'ОК', 2);

        const lastVersion = await getRateOfReturnRulesLastVersion(ambientProperties);
        input.data.version = lastVersion;
    }
};
