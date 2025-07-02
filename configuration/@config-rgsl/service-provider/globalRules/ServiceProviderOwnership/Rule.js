module.exports = function ownership(input, ambientProperties) {

    const commonBody = input.commonBody;

    const ownershipResult = input.ownershipResult ?? {};

    const currentUser = this.applicationContext?.originatingUser;

    if (!ownershipResult.owner && currentUser) {
        ownershipResult.owner = currentUser.username;
    }

    ownershipResult.partyCode = commonBody.partyCode;
    ownershipResult.organisationUnit = commonBody.attributes?.orgUnitCode;

    return ownershipResult;
};
