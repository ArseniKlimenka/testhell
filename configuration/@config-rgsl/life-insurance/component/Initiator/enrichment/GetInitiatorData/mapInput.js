module.exports = function mapping(input) {

    const employeeCode = this.businessContext?.rootData?.initiator?.employeeCode;
    if (employeeCode) { return null; }

    const isCreatedByOperations = this.businessContext?.rootData?.technicalInformation?.isCreatedByOperations ?? false;
    if (isCreatedByOperations) { return null; }

    const userId = this.businessContext?.rootData?.initiator?.userId ?? this.applicationContext.originatingUser.id;
    const actualEmail = this.businessContext?.rootData?.initiator?.actualEmail;
    const sadNumber = this.businessContext?.rootData?.initiator?.sadNumber;

    const output = {
        data: {
            criteria: {
            }
        }
    };

    if (sadNumber) {
        output.data.criteria.sadNumber = sadNumber;
    } else if (!actualEmail) {
        output.data.criteria.userId = userId;
    } else {
        output.data.criteria.actualEmail = actualEmail;
    }

    return output;

};
