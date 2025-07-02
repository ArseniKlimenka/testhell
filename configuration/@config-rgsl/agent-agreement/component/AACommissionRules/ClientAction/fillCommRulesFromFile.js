'use strict';

const { updateCommissionRulesTable } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PleaseSaveDocumentFirst
 * @translationKey {translationKey} startDate
 * @translationKey {translationKey} endDate
 * @translationKey {translationKey} insuranceYear
 * @translationKey {translationKey} insuranceTermFrom
 * @translationKey {translationKey} insuranceTermTo
 * @translationKey {translationKey} premiumPeriodFrom
 * @translationKey {translationKey} premiumPeriodTo
 * @translationKey {translationKey} rate
 * @translationKey {translationKey} expensesRate
 * @translationKey {translationKey} natuaralPersonRate
 * @translationKey {translationKey} solePropriatorRate
 * @translationKey {translationKey} amount
 * @translationKey {translationKey} isManualCorrectionDisabled
 * @translationKey {translationKey} alwaysUseMaxRate
 * @translationKey {translationKey} isDiscountDisabled
 */

module.exports = async function fillCommRulesFromFile(input, ambientProperties) {

    const aaCommissionRulesClient = input.additionalContext?.aaCommissionRulesClient;
    const fileId = aaCommissionRulesClient?.commRulesFile?.fileId;
    const number = input.rootContext.Number;

    if (!number) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.PleaseSaveDocumentFirst', 'OK', 'OK', 2);
        return false;
    }

    if (!fileId) {

        return;
    }

    this.view.startBlockingUI();

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/CommRulesImportInfoDataSource',
        data: {
            data: {
                criteria: {
                    fileId: fileId,
                }
            }
        }
    };

    let commRulesData = [];
    let formatErrorMessage = '';

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        const rowsMessage = getRowsFormatErrorMessage(err, ambientProperties);
        this.view.stopBlockingUI();

        if (rowsMessage?.length > 0) {

            formatErrorMessage = `Ошибка при проверке формата данных!<br>${rowsMessage}`;
            return;
        }

        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (result?.data && result.data.length > 0) {

        commRulesData = result.data;
    }


    if (formatErrorMessage.length > 0) {

        ambientProperties.services.confirmationDialog
            .showError(formatErrorMessage, 'OK', 'OK', 2);
        this.view.stopBlockingUI();
        return;
    }

    const commRulesToAddResult = getCommRulesToAdd(commRulesData, number);

    const dataErrorMessageItems = [];

    for (const prop in commRulesToAddResult.notFoundProductsObj) {

        const rowMessage = `Строка ${parseInt(prop)} - не найдены продукты: ${commRulesToAddResult.notFoundProductsObj[prop]}`;
        dataErrorMessageItems.push(rowMessage);
    }

    if (dataErrorMessageItems.length > 0) {

        ambientProperties.services.confirmationDialog
            .showError(`Ошибка подготовки данных!<br>${dataErrorMessageItems.join(';<br>')};<br>`, 'OK', 'OK', 2);

        this.view.stopBlockingUI();
        return;
    }

    input.componentContext.push(...commRulesToAddResult.commRulesToAdd);
    updateCommissionRulesTable(input, this.view);

    aaCommissionRulesClient.commRulesFile = undefined;
    this.view.stopBlockingUI();
};

function getCommRulesToAdd(commRulesData, number) {

    const notFoundProductsObj = {};
    const commRulesToAdd = [];

    commRulesData.forEach(r => {

        const newItem = getDefaultItem(number);
        const data = r.resultData;

        const notFoundProducts = r.resultData.notFoundProducts ?? [];

        if (notFoundProducts.length > 0) {

            notFoundProductsObj[commRulesData.indexOf(r) + 1] = notFoundProducts.join(', ');
        }

        newItem.startDate = data.startDate;
        newItem.endDate = data.endDate;

        const products = data.insuranceProduct?.data ?? [];

        if (products.length > 0) {

            newItem.insuranceProduct.values = [];

            products.forEach(p => {

                if (p.code && p.description) {

                    newItem.insuranceProduct.values.push({ code: p.code, description: p.description });
                }
            });

            newItem.insuranceProduct.isInverted = data.insuranceProduct.isInverted;
        }

        const currency = data.insuranceCurrency?.data;

        if (currency) {

            newItem.insuranceCurrency.value = {
                code: currency,
                description: currency
            };

            newItem.insuranceCurrency.isInverted = data.insuranceCurrency.isInverted;
        }

        const insuranceYear = data.insuranceYear;

        if (insuranceYear) {

            newItem.insuranceYear = {
                value: insuranceYear
            };
        }

        newItem.insuranceTerm.value.from = data.insuranceTermFrom;
        newItem.insuranceTerm.value.to = data.insuranceTermTo;
        newItem.premiumPeriod.value.from = data.premiumPeriodFrom;
        newItem.premiumPeriod.value.to = data.premiumPeriodTo;

        const premiumPeriod = data.premiumPeriodType?.data ?? [];

        if (premiumPeriod.length > 0) {

            newItem.premiumPeriodType.values = [];

            premiumPeriod.forEach(p => {

                if (p.code && p.description) {

                    newItem.premiumPeriodType.values.push({ code: p.code, description: p.description });
                }
            });

            newItem.premiumPeriodType.isInverted = data.premiumPeriodType.isInverted;
        }

        newItem.rate = data.rate;
        newItem.expensesRate = data.expensesRate;
        newItem.natuaralPersonRate = data.natuaralPersonRate;
        newItem.solePropriatorRate = data.solePropriatorRate;
        newItem.amount = data.amount;
        newItem.isManualCorrectionDisabled = data.isManualCorrectionDisabled;
        newItem.alwaysUseMaxRate = data.alwaysUseMaxRate;
        newItem.isDiscountDisabled = data.isDiscountDisabled;

        const programs = data.creditProgram?.data ?? [];

        if (programs.length > 0) {

            newItem.creditProgram.values = [];

            programs.forEach(p => {

                if (p.code && p.description) {

                    newItem.creditProgram.values.push({ code: p.code, description: p.description });
                }
            });

            newItem.creditProgram.isInverted = data.creditProgram.isInverted;
        }

        commRulesToAdd.push(newItem);
    });

    return {
        commRulesToAdd: commRulesToAdd,
        notFoundProductsObj: notFoundProductsObj
    };
}

function getRowsFormatErrorMessage(error, ambientProperties) {

    const errorMessage = error.error?.Message ?? '';
    const pattern = /\\"keyword\\":(.*?),\\"message\\":\\"(.*?) (.*?)\\",\\"dataPath\\":\\"\/data\/([0-9]+)\/resultData\/.*?\\"/g;

    const rowsObj = {};

    for (const match of errorMessage.matchAll(pattern)) {

        if (!rowsObj[match[4]]) {

            rowsObj[match[4]] = [];
        }

        const fieldOriginalName = match[2];
        const fieldTranslatedName = ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName.toUpperCase(), fieldOriginalName);
        const errorText = match[3];

        rowsObj[match[4]].push(`${fieldTranslatedName} ${errorText}`);
    }

    const errorMessageItems = [];

    for (const prop in rowsObj) {

        const rowMessage = `Строка ${parseInt(prop) + 1} содержит ошибки форматирования: ${rowsObj[prop].join(' ')};<br>`;
        errorMessageItems.push(rowMessage);
    }

    return errorMessageItems.join(' ');
}

function getDefaultItem(number) {

    return {
        registratorNumber: number,
        insuranceProduct: {
            isInverted: false
        },
        insuranceCurrency: {
            isInverted: false
        },
        insuranceTerm: {
            value: {
                fromIncluded: true,
                toIncluded: true
            },
            isInverted: false
        },
        premiumPeriod: {
            value: {
                fromIncluded: true,
                toIncluded: true
            },
            isInverted: false
        },
        premiumPeriodType: {
            isInverted: false
        },
        isManualCorrectionDisabled: false,
        alwaysUseMaxRate: false,
        isDiscountDisabled: false,
        creditProgram: {
            isInverted: false
        }
    };
}
