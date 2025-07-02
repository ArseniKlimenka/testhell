module.exports = function mapping(input) {

    const rootData = this.businessContext?.rootData;
    const isCreatedByOperations = rootData.technicalInformation?.isCreatedByOperations;
    const partnerCode = rootData.mainInsuranceConditions?.partner?.partnerCode;
    const partnerDescription = rootData.mainInsuranceConditions?.partner?.partnerDescription;

    if (partnerDescription || (isCreatedByOperations && !partnerCode)) {
        return null;
    }

    const output = {
        data: {
            criteria: {}
        }
    };

    if (partnerCode) {
        output.data.criteria.partnerCode = partnerCode;
    } else {
        output.data.criteria.userId = this.applicationContext.originatingUser.id;
    }

    return output;

};
