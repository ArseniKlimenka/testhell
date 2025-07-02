const { Client, callDataSource, VersionedDocumentBuilder } = require('@adinsure-tools/api-test-framework');
const { retryValidate } = require('../common/testHelperFuncs');
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const chai = require('chai');
const expect = chai.expect;

module.exports = {
    cancel,
    approving,
    approved,
    createBsiPaymentOrder,
    getLastPoRgslRequest,
};

async function setStatus(paymentOrderNumber, transitionName, expectedState, finalState) {
    const builder = new VersionedDocumentBuilder('PaymentOrder');
    const data = await builder
        .getDocumentByNumber(paymentOrderNumber)
        .makeTransition(transitionName, expectedState)
        .retryValidateDataSource(
            'PODocumentSearchDataSource',
            context => ({
                paging: undefined,
                criteria : { paymentOrderNumber: context.documentNumber },
            }),
            (result, context) => {
                expect(result.data.length, 'PO not found!').to.be.equal(1);
                const po = result.data[0].resultData;
                expect(po.originalStateCode, 'PO is in wrong state!').to.be.equal(finalState ?? expectedState);
            },
        )
        .build();
}

async function cancel(paymentOrderNumber) {
    await setStatus(paymentOrderNumber, 'Draft_to_Cancelled', 'Cancelled');
}

async function approving(paymentOrderNumber) {
    await setStatus(paymentOrderNumber, 'Draft_to_WaitingForApproval', 'WaitingForApproval');
}

async function approved(paymentOrderNumber, finalState) {
    await setStatus(paymentOrderNumber, 'WaitingForApproval_to_Approved', 'Approved', finalState);
}

async function createBsiPaymentOrder(bankStatementItemId, actor) {
    const request = {
        data: {
            paymentOrderType: paymentOrderType.PaymentRefund,
            referenceNumber: bankStatementItemId.toString(),
        },
    };

    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/core/shared/integration-services/CreatePaymentOrder/1',
        requestBody: request,
        actor: actor});

    const result = await retryValidate(
        async () => callDataSource('PODocumentSearchDataSource', {
            paging: undefined,
            criteria : {
                referenceNumber: bankStatementItemId.toString(),
            },
        }, client),
        (result, context) => {
            expect(result.data.length, 'PO not found!').to.be.equal(1);
        },
    );

    return result.data[0].resultData;
}

async function getLastPoRgslRequest(invoiceNumber) {
    const result = await retryValidate(
        async context => {
            const client = new Client();
            const data = await client.HttpPost({
                apiPath: '/api/rgsl/mock-services/payment-order/send-request/get-last-request'});
            return data;
        },
        (result, context) => {
            const resultInvoiceNumber = result?.['soap:Envelope']?.['soap:Body']?.['koss:AddBill']?.['koss:request']?.['hi:InvoiceNumber'];
            expect(resultInvoiceNumber, 'RGSL po request was not found!').to.be.equal(invoiceNumber);
        }
    );

    return result;
}
