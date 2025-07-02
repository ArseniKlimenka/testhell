'use strict';

module.exports = {

    eventType: {
        ModifyDocsStatus: "ModifyDocsStatus",
        PartnerIsPolicyholder: "PartnerIsPolicyholder",
        AllocationFinished: "AllocationFinished",
        SportsmanContractIsCancelledOrFinished: "SportsmanContractIsCancelledOrFinished",
    },

    eventStatus: {
        Created: "Created",
        Sent: "Sent",
        Error: "Error",
        NotificationReady: "NotificationReady"
    },

    subscriber: {
        AGIMA: "AGIMA",
        ELMA: "ELMA",
        EFR: "EFR",
        ELMA365: "ELMA365",
        POLICY_HOLDER_CHECK: "POLICY_HOLDER_CHECK",
        SPORTSMAN_CREATE: "SPORTSMAN_CREATE",
        SPORTSMAN_DELETE: "SPORTSMAN_DELETE"
    }
};
