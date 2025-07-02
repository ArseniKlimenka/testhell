'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { partyType, partyDocumentType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function documentOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const duplicates = await checkDuplicates(this, input, ambientProperties);
        if (duplicates.length > 0) {
            const errorMessage = `Контрагент с таким номером паспорта уже существует - номер контрагента: ${duplicates.join(',')}.`;
            await ambientProperties.services.confirmationDialog.showConfirmation(errorMessage, 'ОК', 'ОК', 2);
            return false;
        }

        const validationErrors = partyDocumentLib.documentValidation(affectedRow, this);

        if (validationErrors && validationErrors.length > 0) {
            const notificationMessage = 'Заполните корректно все небходимые данные!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        return true;

    }

    if (['Delete'].includes(operationType)) {
        const notificationMessage = 'Вы уверены, что хотите выполнить удаление?';
        const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
        return answer;
    }

};

async function getParties(self, criteria, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GeneralPartyDataSource',
        data: {
            data: {
                criteria
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    const parties = getValue(result, 'data', []);
    const partyCodes = parties.map(x => x.resultData.code);
    return partyCodes;
}

async function checkDuplicates(self, input, ambientProperties) {

    if (input.rootContext.ConfigurationCodeName != 'NaturalPerson') {

        return [];
    }

    const duplicates = [];
    const document = input.affectedRow;
    if (document.docType.docTypeCode != partyDocumentType.passport) {
        return duplicates;
    }

    const criteria = {};
    criteria.partyType = partyType.NaturalPerson;
    criteria.docSeries = document.docSeries;
    criteria.docNumber = document.docNumber;
    criteria.docTypeCode = document.docType.docTypeCode;

    const parties = await getParties(self, criteria, ambientProperties);
    parties.filter(p => p != input.context.Code).forEach(p => duplicates.push(p));

    return duplicates;
}
