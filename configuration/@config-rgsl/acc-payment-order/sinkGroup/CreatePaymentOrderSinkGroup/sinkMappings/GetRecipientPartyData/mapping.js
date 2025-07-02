'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { partyCodes } = require("@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst");

module.exports = function mapping(input, sinkExchange) {

    let partyCodeForRequest = undefined;
    let traderPartnerCodeForRequest = undefined;

    if (input.paymentOrderType === paymentOrderType.Commission) {

        partyCodeForRequest = sinkExchange.recipientServiceProvider.partyCode;
    }
    else if (input.paymentOrderType === paymentOrderType.Claim && input.paymentOrderSubtype !== paymentOrderSubType.Collective) {

        partyCodeForRequest = input.beneficiaryCode;
    }
    else if (input.paymentOrderType === paymentOrderType.Claim && input.paymentOrderSubtype === paymentOrderSubType.Collective) {

        const claimData = sinkExchange.claimData;
        partyCodeForRequest = claimData.holderPartyCode;
    }
    else if (input.paymentOrderType === paymentOrderType.PolicyCancellation && !input.paymentOrderSubtype) {

        partyCodeForRequest = input.cancellationRecipientCode;
    }
    else if (input.paymentOrderType === paymentOrderType.PolicyCancellation && input.paymentOrderSubtype === paymentOrderSubType.PIT) {

        const pitRecipientCode = this.environmentVariables['rgsl.createPaymentOrderParams.defaultPITRecipient'];
        const pitRecipientTraderPartnerCode = this.environmentVariables['rgsl.createPaymentOrderParams.defaultPITRecipientTraderPartnerCode'];

        if (pitRecipientTraderPartnerCode) {

            traderPartnerCodeForRequest = pitRecipientTraderPartnerCode;
        }
        else {

            partyCodeForRequest = pitRecipientCode ? pitRecipientCode : undefined;
        }
    }

    if (partyCodeForRequest || traderPartnerCodeForRequest) {

        return {
            input: {
                data: {
                    criteria: {
                        partyCode: partyCodeForRequest,
                        traderPartnerCode: traderPartnerCodeForRequest,
                    }
                }
            }
        };
    }
};
