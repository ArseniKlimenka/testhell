"use strict";

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {
    const result = [];

    const body = createBody(input, this);
    const departments = getInquiryDepartments(input);
    departments.forEach(department => {

        setDepartment(body, department);

        result.push({ body });
    });

    return result;

};

function getInquiryDepartments(input) {

    const uwTriggers = getValue(input, 'body.uwTriggers', []);
    const departments = [];
    uwTriggers.forEach(trigger => {
        if (!departments.some(department => department.code == trigger.departament)) {
            departments.push({ code: trigger.departament, nameLocalized: trigger.confirmationDepartment });
        }
    });

    return departments;
}

function createBody(input, that) {

    const body = {
        inquiry: {
            configurationCodeName: input.configurationCodeName,
            quoteNumber: input.number,
            quoteId: input.id,
            creatorUserName: that.applicationContext.originatingUser.username,
            holder: input.body.policyHolder?.partyData?.partyFullName,
            policyReviewNumber: input.body.technicalInformation.policyReviewNumber + 1
        }
    };

    return body;
}

function setDepartment(body, department) {

    body.inquiry.department = department;
}
