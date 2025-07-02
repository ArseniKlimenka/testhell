const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyDuplicatesHelper = require('@config-rgsl/party/lib/partyDuplicatesHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function beforeSave(input, ambientProperties) {

    // duplicates check
    const body = input.context.Body;
    const partyType = ambientProperties.configurationCodeName;
    const partyCode = input.context.Code;
    const duplicatesCount = await partyDuplicatesHelper.getDuplicatesCount(body, partyType, partyCode, ambientProperties);
    if (duplicatesCount > 0) {
        const notificationMessage = "Обнаружен дубль по ОГРН!";
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        return false;
    }

    const currentDate = DateTimeUtils.dateNow();
    input.context.Body.partyGeneralData.lastUpdateDate = currentDate;

};
