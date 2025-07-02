'use strict';

const rgslRequestHelper = require("@config-rgsl/acc-payment-order/lib/paymentOrderRgslRequestHelper");

module.exports = function mapping(input, sinkExchange) {

    const body = input.body;
    const actData = sinkExchange.resolveContext("actData");
    const aaData = sinkExchange.resolveContext("aaData");
    const contractData = sinkExchange.resolveContext("contractData");
    const recipientData = sinkExchange.resolveContext("recipientData");
    const claimRiskInformationData = sinkExchange.resolveContext("claimRiskInformationData");

    if (body.paymentOrderAmounts.totalPaymentAmount <= 0) {

        sinkExchange.mapContext('sendToPaid', true);
        return;
    }

    if (rgslRequestHelper.checkNonAcceptance(body.paymentOrderInformation)) {

        return;
    }

    const data = rgslRequestHelper.getRequestData(input.number, body, actData, aaData, contractData, recipientData, claimRiskInformationData);
    const xmlRequest = rgslRequestHelper.getXmlRequest(data);

    const request = {
        request: {
            baseAddress: this.environmentVariables['rgsl.sendPaymentOrderRequest.baseAddress'],
            requestUri: this.environmentVariables['rgsl.sendPaymentOrderRequest.requestUri'],
            content: xmlRequest,
            user: this.environmentVariables['rgsl.sendPaymentOrderRequest.user'],
            password: this.environmentVariables['rgsl.sendPaymentOrderRequest.password'],
        }
    };

    return request;
};
