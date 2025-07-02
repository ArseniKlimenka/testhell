'use strict';
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function executeDeduplication(input, ambientProperties) {

    startDeduplication(this, input, ambientProperties, saveDocument);

};

async function startDeduplication(self, input, ambientProperties, saveDeduplication) {

    const body = input.context.Body;
    const masterPartyPartyCode = body.masterParty.partyCode;
    const masterPartyPartyBody = body.masterParty.body;
    const duplicatePartyPartyCode = body.duplicateParty.partyCode;
    const duplicatePartyPartyBody = body.duplicateParty.body;
    const duplicatePartyPartyId = body.duplicateParty.partyId;
    await self.view.save();

    if (!masterPartyPartyCode || !duplicatePartyPartyCode || masterPartyPartyCode == duplicatePartyPartyCode) {
        ambientProperties.services.confirmationDialog.showConfirmation('Контрагенты должны быть выбраны и быть разными!', 'ОК', 'ОК', 2);
        return;
    }

    if (!isDuplicatedPartyData(masterPartyPartyBody, duplicatePartyPartyBody)) {
        ambientProperties.services.confirmationDialog.showConfirmation('Просьба проверить введенные значения, дублей не обнаружено', 'ОК', 'ОК', 2);
        return;
    }

    self.view.startBlockingUI();

    const executeDeduplicationRequest = {
        method: 'post',
        url: 'api/core/shared/integration-services/ExecuteDeduplication/1',
        data: {
            data: {
                masterPartyCode: masterPartyPartyCode,
                duplicatePartyCode: duplicatePartyPartyCode,
                duplicatePartyId: duplicatePartyPartyId
            }
        }
    };

    let executeDeduplicationResult;
    try {
        self.view.startBlockingUI();
        executeDeduplicationResult = await ambientProperties.services.api.call(executeDeduplicationRequest);
    }
    catch (error) {
        await rollbackAction(self, ambientProperties, error, duplicatePartyPartyId);
        return;
    }
    finally {
        self.view.stopBlockingUI();
    }

    const dedupRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetDeduplicationInfoDataSource',
        data: {
            data: {
                criteria: {
                    deduplNumber: masterPartyPartyCode,
                    partyCode: duplicatePartyPartyCode
                }
            }
        }
    };

    let dedupResult;
    try {
        self.view.startBlockingUI();
        dedupResult = await ambientProperties.services.api.call(dedupRequest);
    }
    catch (error) {
        ambientProperties.services.confirmationDialog.showError(`${error.message}. ${error.error.Message}`, 'OK', 'OK', 2);
        return;
    }
    finally {
        self.view.stopBlockingUI();
    }

    const resultData = dedupResult.data.map(i => i.resultData);
    const resultDataByMaxId = resultData.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current;
    });
    const updatedDocuments = resultDataByMaxId.updatedDocuments;
    body.updatedDocuments = updatedDocuments.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.NUMBER === value.NUMBER
        ))
    );

    const codeNames = body.updatedDocuments.map(i => i.CODE_NAME + '@Title');

    const translationsRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetPublishedTranslationsDataSource',
        data: {
            data: {
                criteria: {
                    subStringArr: codeNames
                }
            }
        }
    };

    let translationsResult;
    try {
        self.view.startBlockingUI();
        translationsResult = await ambientProperties.services.api.call(translationsRequest);
    }
    catch (error) {
        ambientProperties.services.confirmationDialog.showError(`${error.message}. ${error.error.Message}`, 'OK', 'OK', 2);
        return;
    }
    finally {
        self.view.stopBlockingUI();
    }

    const translations = translationsResult.data.map(i => i.resultData.translationSubStringEl);

    body.updatedDocuments.forEach(el => {
        el.DOC_NAME = el.CODE_NAME;
    });

    body.updatedDocuments.forEach(el => {
        translations.forEach(tr => {
            Object.keys(tr).forEach(key => {
                if (key.includes(el.CODE_NAME)) {
                    el.DOC_NAME = tr[key];
                }
            });
        });
    });

    saveDeduplication(input, ambientProperties, self, body.updatedDocuments, transitionDocument);

    self.view.rebind();
}

async function rollbackAction(self, ambientProperties, error, duplicatePartyPartyId) {
    const esIndexDocumentRequest = {
        method: 'post',
        url: 'api/core/shared/integration-services/ElasticsearchIndexDocument/1',
        data: {
            data: {
                entityType: 'Party',
                configurationName: 'NaturalPerson',
                entityId: duplicatePartyPartyId
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(esIndexDocumentRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
        ambientProperties.services.confirmationDialog.showError(`${error.message}. ${error.error.Message}`, 'OK', 'OK', 2);
    }

    self.view.rebind();

    ambientProperties.services.confirmationDialog.showError(`${error.message}. ${error.error.data.errorResponse.message}`, 'OK', 'OK', 2);
}

function isDuplicatedPartyData(masterPartyPartyBody, duplicatePartyPartyBody) {

    const fullNameDuplicated = masterPartyPartyBody.fullName == duplicatePartyPartyBody.fullName;
    const dateOfBirthDuplicated = masterPartyPartyBody.dateOfBirth == duplicatePartyPartyBody.dateOfBirth;

    let documentsDuplicated = false;
    const masterIdentityDocuments = masterPartyPartyBody?.identityDocuments;
    const duplicateIdentityDocuments = duplicatePartyPartyBody.identityDocuments;

    for (let i = 0; i < masterIdentityDocuments.length; i++) {
        if (documentsDuplicated) { break; }
        for (let j = 0; j < duplicateIdentityDocuments.length; j++) {
            if (masterIdentityDocuments[i].documentSeries == duplicateIdentityDocuments[j].documentSeries &&
                masterIdentityDocuments[i].documentNumber == duplicateIdentityDocuments[j].documentNumber) {
                documentsDuplicated = true;
                break;
            }
        }
    }

    return fullNameDuplicated || dateOfBirthDuplicated || documentsDuplicated;
}

async function saveDocument(input, ambientProperties, documentContext, updDocuments, transitionDocument) {
    input.context.Body.updatedDocuments = updDocuments;
    await documentContext.view.save();
    await transitionDocument(input, ambientProperties, documentContext);
}

async function transitionDocument(input, ambientProperties, documentContext) {
    documentContext.view.makeTransition('Draft_to_Issued');
    documentContext.view.rebind();
}
