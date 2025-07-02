'use strict';

const { getUniversalSetFunctionObject } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');
const { isSaveOperationAvailable, refreshView } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');
const { currency, documentEditMode } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    input.rootContext.ClientViewModel.documentEditMode = documentEditMode.mainDocument;
    input.rootContext.ClientViewModel.isDocumentLocked = isDocumentLocked;

    input.rootContext.manualDocumentNumber = input.context.Body.mainAttributes.manualDocumentNumber;

    const documentCreation = !input.context.Number;

    if (documentCreation) {

        input.context.Body.mainAttributes = {};
        input.context.Body.mainAttributes.documentCurrency = currency.defaultCurrency;
        input.context.Body.validity = {};
        input.context.Body.validity.startDate = dateUtils.dateNow();
        input.context.Body.validity.conclusionDate = input.context.Body.validity.startDate;
        input.context.Body.additionalAttributes.isDocCorrect = true;
    }

    if (!documentCreation && !isDocumentLocked && input.context.State.Code === 'Draft') {

        const commRules = input.context.Body.commissionRules;

        if (commRules && commRules.length > 0) {

            const hasUnregisteredRules = !!commRules.find(rule => !rule.registratorNumber);

            if (hasUnregisteredRules) {

                commRules.forEach(rule => {

                    const isUnregistered = !rule.registratorNumber;

                    if (isUnregistered) {

                        rule.registratorNumber = input.context.Number;
                    }
                });
            }
        }
    }

    if (isDocumentLocked) {

        this.view.disableAllElements();
    }

    const functionsObject = getUniversalSetFunctionObject(ambientProperties);
    input.rootContext.ClientViewModel.productsList = await functionsObject.getAllInsuranceProducts();
    input.rootContext.ClientViewModel.creditProgramList = await functionsObject.getAllCreditPrograms();

    refreshView(this.view);
};
