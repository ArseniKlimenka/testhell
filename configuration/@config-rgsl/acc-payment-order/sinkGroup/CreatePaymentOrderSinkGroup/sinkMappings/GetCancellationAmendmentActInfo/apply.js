'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        const data = sinkResult.data.map(r => r.resultData)[0];

        sinkExchange.insuranceActRiskCode = data?.riskCode;

        const stateRecord = data.stateHistoryResult
            .filter(item => item.transition === 'AwaitingPaymentDocuments_to_POCreation' ||
                item.transition === 'OperationsDirectorApproval_to_SentToPayment' ||
                item.transition === 'OperationsApproval_to_POCreation')

            .sort(function (a, b) { return new Date(b.validFromWithTime).getTime() - new Date(a.validFromWithTime).getTime(); });

        const actData = stateRecord[0];


        if (actData) {

            sinkExchange.insuranceActDate = actData.validFrom;
            sinkExchange.insuranceActExecutor = actData.changedByParty;
            sinkExchange.insuranceActExecutorCode = actData.changedByPartyCode;
        }

        const directorInquiry = getLatestDepartmentInquiry(data.inquiriesResult, 'operationsDirector');

        if (directorInquiry) {

            sinkExchange.directorSignerData = {
                signedDateTime: directorInquiry.changedOn,
                signedBy: directorInquiry.changedByParty,
                signedByCode: directorInquiry.changedByPartyCode,
                signedByUser: directorInquiry.changedByUser
            };
        }
    }
};

function getLatestDepartmentInquiry(inquiries, departmentCode) {

    const initialInquiries = inquiries ?? [];
    const filteredInquiries = initialInquiries.filter(i => i.departmentCodeName === departmentCode && i.stateCode === "Issued");
    const sortedInquiries = filteredInquiries
        .sort(function (a, b) { return new Date(b.updatedOnSystemFormat).getTime() - new Date(a.updatedOnSystemFormat).getTime(); });

    return sortedInquiries[0];
}
