module.exports = function ownership(input, ambientProperties) {

    const {
        body,
    } = input;

    const ownershipResult = input.ownershipResult ?? {};
    const currentUser = this.applicationContext?.originatingUser;

    if (!ownershipResult.owner && currentUser) {
        ownershipResult.owner = currentUser.username;
    }

    const partnerBusinessCode = body.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const organisationUnit = body.initiator?.organisationUnitCode;


    if (partnerBusinessCode) {
        ownershipResult.partnerBusinessCode = partnerBusinessCode;
    }

    if (organisationUnit) {
        ownershipResult.organisationUnit = organisationUnit;
    }

    return ownershipResult;
};
