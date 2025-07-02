'use-strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} ExactlyOneItemShouldBeSelected MultiplePeople MultipleCurrencies CouldntCreate
 */

module.exports = async function createAndGoToPaymentOrder(input, ambientProperties) {

    if (!isDataChosen(input)) {
        warning(ambientProperties, 'ExactlyOneItemShouldBeSelected');
        return;
    }

    const selection = input.data.selection;

    const isValidPerson = selection.every(person => person.resultData.personCode === selection[0].resultData.personCode);
    const isValidCurrency = selection.every(person => person.resultData.currencyCode === selection[0].resultData.currencyCode);
    // if there is only one person
    if (!isValidPerson || !isValidCurrency) {
        if (!isValidPerson) {
            warning(ambientProperties, 'MultiplePeople');
        } else if (!isValidCurrency) {
            warning(ambientProperties, 'MultipleCurrencies');
        }
        return;
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/CreatePaymentOrder/1',
        data: {
            data: {
                paymentOrderType: paymentOrderType.PaymentRefund,
                referenceNumber: selection[0].resultData.bankStatementItemId.toString(),
            }
        },
        returnFullResponse: true
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const resultBody = result.body; // eslint-disable-line @adinsure-tools/adinsure/no-body-property

    const parametersData = {
        parameters: {
            entity: 'PaymentOrder',
            configurationCodeName: 'PaymentOrder',
            version: 1,
            documentNumber: resultBody.data.paymentOrders[0].paymentOrderNumber
        }
    };

    if (resultBody.Code === 422) {
        throw new Error(resultBody.data.errorData.message);
    }
    if (parametersData.parameters.documentNumber) {
        ambientProperties.services.navigation.navigate('/edit', parametersData);
    } else {
        warning(ambientProperties, 'CouldntCreate');
    }
};

function isDataChosen(input) {
    if (input.data && input.data.selection) {
        if (input.data.selection.length === 1) {
            return true;
        }
        return false;
    }
    return false;

}

function warning(ambientProperties, translationKey) {
    ambientProperties.services.confirmationDialog.showWarning(
        `${ambientProperties.configurationCodeName.toUpperCase()}.${translationKey}`,
        'UI_BOOTSTRAP.##OK',
        undefined,
        1);
}
