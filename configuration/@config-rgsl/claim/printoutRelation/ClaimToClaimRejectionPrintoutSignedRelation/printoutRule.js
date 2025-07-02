'use strict';

module.exports = function rule(input) {

    const rejectionReasonCode = input.body.mainAttributes?.rejectionReason?.code;
    const rejectionNote = input.body.mainAttributes.rejectionNote;
    const currentActor = this.applicationContext.originatingActorCode;
    const currentState = this.businessContext.documentState;

    const actorsList = {
        ClaimManagerApproval: ["ClaimManager"],
        RejectedByCommonReasons: ["ClaimManager", "Legal", "Security", "ClaimDirector", "MethodologyDirector"],
        Rejected: ["ClaimManager", "Legal", "Security", "ClaimDirector", "MethodologyDirector"]
    };

    const actors = actorsList[currentState] ?? [];

    /* Dont forget to add new actors and/or states into configuration.json even if this printout should not be avalable for them.
    States where this printout is not available for all actors can be ignored.
    Or face consequences...
    Printout relations translations are not loading properly if actors are not listed inside configuration.json.*/
    const isAvailable = actors.includes(currentActor);

    if (rejectionReasonCode && rejectionNote && isAvailable) {

        return {};
    }
};
