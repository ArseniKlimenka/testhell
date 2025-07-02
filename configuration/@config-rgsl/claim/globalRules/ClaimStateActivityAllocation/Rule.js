'use strict';

const { activities } = require('@adinsure/runtime');
const { claimStates, claimStatesToAllocateActivities } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function allocate(input) {

    const result = [];
    allocateClaim(input, result, this.applicationContext);

    return result;
};

function allocateClaim(input, result, applicationContext) {

    if (!claimStatesToAllocateActivities.includes(input.stateCodeName)) {

        return null;
    }

    const currentUsername = applicationContext.originatingUser.username;

    switch (input.stateCodeName) {
        case claimStates.claimManagerApproval:
            allocatClaimToCurrentOrPreviousUser(result, "claims", input.stateCodeName, currentUsername);
            break;
        case claimStates.requestToClient:
            allocateClaimToGroup(result, "claims");
            break;
        case claimStates.requestToExternalOrganisation:
            allocateClaimToGroupOrPrevUser(result, "claims", input.stateCodeName);
            break;
        case claimStates.securityApproval:
            allocateClaimToGroupOrPrevUser(result, "security", input.stateCodeName);
            break;
        case claimStates.legalApproval:
            allocateClaimToGroupOrPrevUser(result, "legal", input.stateCodeName);
            break;
        case claimStates.claimDiretorApproval:
            allocateClaimToGroupOrPrevUser(result, "claimDirector", input.stateCodeName);
            break;
        case claimStates.methodologyDirectorApproval:
            allocateClaimToGroupOrPrevUser(result, "methodologyDirector", input.stateCodeName);
            break;
        default:
            break;
    }
}

function allocatClaimToCurrentOrPreviousUser(result, groupCode, state, currentUsername) {

    const previousActivities = getPreviousActivities(state);
    const previousActivity = getPreviousActivity(previousActivities, groupCode);

    if (previousActivity) {

        const username = previousActivity.assignedUsername;
        result.push({
            username: username,
            userGroup: groupCode
        });
    }
    else {

        result.push({
            username: currentUsername,
            userGroup: groupCode
        });
    }
}

function allocateClaimToGroupOrPrevUser(result, groupCode, state) {

    const previousActivities = getPreviousActivities(state);
    const previousActivity = getPreviousActivity(previousActivities, groupCode);

    if (previousActivity) {

        const username = previousActivity.assignedUsername;
        result.push({
            username: username,
            userGroup: groupCode
        });
    }
    else {

        result.push({
            userGroup: groupCode,
            assignAutomatically: false
        });
    }
}

function allocateClaimToGroup(result, groupCode) {

    result.push({
        userGroup: groupCode,
        assignAutomatically: false
    });
}

function getPreviousActivities(state) {

    return activities.getPreviousActivities('State', state);
}

function getPreviousActivity(previousActivities, groupName) {

    if (previousActivities && previousActivities.length > 0) {

        if (groupName) {

            return previousActivities.find(a => a.assignedGroup === groupName);
        }


        return previousActivities[0];

    }

    return undefined;
}
