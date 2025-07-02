'use strict';

const { endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        const data = sinkResult.data.map(r => r.resultData)[0];

        const stateRecord = data.stateHistoryResult
            .filter(item => item.transition === endowmentTransitions.operationsToPoCreation ||
                item.transition === endowmentTransitions.directorToSentToPayment ||
                item.transition === endowmentTransitions.operationsDirectorToSentToPayment)
            .sort(function (a, b) { return new Date(b.validFromWithTime).getTime() - new Date(a.validFromWithTime).getTime(); });

        const actData = stateRecord[0];

        if (actData) {

            sinkExchange.insuranceActDate = actData.validFrom;
            sinkExchange.insuranceActExecutor = actData.changedByParty;
            sinkExchange.insuranceActExecutorCode = actData.changedByPartyCode;
        }


        const directorInquiry = getLatestDepartmentInquiry(data.inquiriesResult, 'operationsDirector');
        const deputyDirectorInquiry = getLatestDepartmentInquiry(data.inquiriesResult, 'deputyDirector');

        if (directorInquiry) {

            sinkExchange.directorSignerData = {

                signedDateTime: directorInquiry.changedOn,
                signedBy: directorInquiry.changedByParty,
                signedByCode: directorInquiry.changedByPartyCode,
                signedByUser: directorInquiry.changedByUser
            };
        }

        if (deputyDirectorInquiry) {

            sinkExchange.directorDeputySignerData = {

                signedDateTime: deputyDirectorInquiry.changedOn,
                signedBy: deputyDirectorInquiry.changedByParty,
                signedByCode: deputyDirectorInquiry.changedByPartyCode,
                signedByUser: deputyDirectorInquiry.changedByUser
            };
        }
    }
};

function getLatestDepartmentInquiry(inquiries, departmentCode) {

    const initialInquiries = inquiries ?? [];
    const filteredInquiries = initialInquiries.filter(i => i.departmentCodeName === departmentCode && i.stateCode === "Issued");
    const sortedInquiries = filteredInquiries
        .sort(function (a, b) { return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime(); });

    return sortedInquiries[0];
}
