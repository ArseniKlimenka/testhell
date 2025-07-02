'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function initRelatedClaims(input, ambientProperties) {

    // Temporary solution
    // TO DO: use search view again after claims ASS will be implemented.

    this.view.startBlockingUI();

    const contractNumber = input.context.Body.mainAttributes?.contract?.number;

    if (!contractNumber) {

        this.view.stopBlockingUI();
        return;
    }

    const claimsRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ClaimSearchDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                },
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    let claimsResult;
    try {
        this.view.startBlockingUI();
        claimsResult = await ambientProperties.services.api.call(claimsRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const claims = claimsResult.data.map(item => item.resultData);

    if (claims.length === 0) {

        this.view.stopBlockingUI();
        return;
    }

    const paymentOrdersRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PODocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                },
            }
        }
    };

    let paymentOrdersResult;
    try {
        this.view.startBlockingUI();
        paymentOrdersResult = await ambientProperties.services.api.call(paymentOrdersRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const paymentOrders = paymentOrdersResult.data.map(item => item.resultData);

    const resultArray = [];

    claims.forEach(claim => {

        const relatedPaymentOrders = paymentOrders.filter(po => po.referenceNumber === claim.claimNumber);

        if (relatedPaymentOrders.length === 0) {

            const resultObject = {
                claimNumber: claim.claimNumber,
                contractNumber: contractNumber,
                claimState: claim.documentState,
                insuredEventNumber: claim.insuredEvent.insuredEventNumber,
                insuredEventDate: claim.insuredEvent.insuredEventDate
            };

            resultArray.push(resultObject);
        }
        else if (relatedPaymentOrders.length === 1) {

            const resultObject = {
                claimNumber: claim.claimNumber,
                contractNumber: contractNumber,
                claimState: claim.documentState,
                insuredEventNumber: claim.insuredEvent.insuredEventNumber,
                insuredEventDate: claim.insuredEvent.insuredEventDate,
                paymentOrderNumber: relatedPaymentOrders[0].paymentOrderNumber,
                paymentOrderState: relatedPaymentOrders[0].stateCode,

            };

            resultArray.push(resultObject);
        }
        else if (relatedPaymentOrders.length > 1) {

            relatedPaymentOrders.forEach(po => {

                const resultObject = {
                    claimNumber: claim.claimNumber,
                    contractNumber: contractNumber,
                    claimState: claim.documentState,
                    insuredEventNumber: claim.insuredEvent.insuredEventNumber,
                    insuredEventDate: claim.insuredEvent.insuredEventDate,
                    paymentOrderNumber: po.paymentOrderNumber,
                    paymentOrderState: po.stateCode
                };

                resultArray.push(resultObject);
            });
        }
    });

    input.context.ClientViewModel.relatedClaims = resultArray;
    this.view.stopBlockingUI();
};
