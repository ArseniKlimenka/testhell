'use strict';

module.exports = function mapping(input) {

    const commonBody = {
        typeOfRequest: input.typeOfRequest,
        accountingYear: input.accountingYear,
        contract: input.contract,
        correctionNumber: input.correctionNumber,
        requestDate: input.requestDate,
        applicantFullName: input.applicantFullName,
        insuredFullName: input.insuredFullName,
        technicalInformation: input.technicalInformation
    };

    return commonBody;

};
