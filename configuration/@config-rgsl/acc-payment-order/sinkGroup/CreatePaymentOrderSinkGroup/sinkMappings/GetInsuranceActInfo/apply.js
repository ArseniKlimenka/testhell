'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        let stateRecord = sinkResult.data.sort(function (a, b) {
            return new Date(b.resultData.validFromWithTime) - new Date(a.resultData.validFromWithTime);
        });

        stateRecord = stateRecord.reverse();

        const actData = stateRecord.find(item => item.resultData.transition === 'ClaimManagerApprovalToClaimDirectorApproval');

        if (actData) {

            sinkExchange.insuranceActDate = actData.resultData.validFrom;
            sinkExchange.insuranceActExecutor = actData.resultData.changedByParty;
            sinkExchange.insuranceActExecutorCode = actData.resultData.changedByPartyCode;
        }

        let signerData = stateRecord.find(item => item.resultData.stateCode === 'POCreation');

        if (!signerData) {

            signerData = stateRecord.find(item => item.resultData.stateCode === 'SentToPayment');
        }

        if (signerData) {

            sinkExchange.signedDateTime = signerData.resultData.validFromWithTime;
            sinkExchange.signedBy = signerData.resultData.changedByParty;
            sinkExchange.signedByCode = signerData.resultData.changedByPartyCode;
            sinkExchange.signedByUser = signerData.resultData.changedByUser;
        }
    }
};
