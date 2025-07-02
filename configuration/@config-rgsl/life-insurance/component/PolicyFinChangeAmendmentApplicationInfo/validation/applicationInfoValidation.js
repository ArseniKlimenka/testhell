'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @errorCode {errorCode} ApplicantIsRequired
 * @errorCode {errorCode} ReceiveMethodIsRequired
 * @errorCode {errorCode} ApplicationDateIsRequired
 * @errorCode {errorCode} ApplicationDateMustBeLessOrEqualToCurrentDate
 * @errorCode {errorCode} ApplicationDateMustBeLessOrEqualToRequestDate
 * @errorCode {errorCode} DocumentsReceivedDateIsRequired
 * @errorCode {errorCode} RegistrationDateIsRequired
 * @errorCode {errorCode} RegistrationDateMustBeLessOrEqualToCurrentDate
 * @errorCode {errorCode} RegistrationDateMustBeAfterPolicyIssueDate
 * @errorCode {errorCode} RequestIssueDateIsRequired
 * @errorCode {errorCode} RequestIssueDateMustBeLessOrEqualToCurrentDate
 * @errorCode {errorCode} RequestIssueDateMustBeAfterPolicyIssueDate
 */

module.exports = function rootLevelValidation(input) {

    const dateNow = dateUtils.dateNow();
    const documentState = this.businessContext.documentState;
    const dataPath = this.businessContext.dataPath;
    const policyIssueDate = this.businessContext.rootData.basicConditions.issueDate;
    const amendmentRegistrationDate = input.registrationDate;
    const amendmentRequestIssueDate = input.requestIssueDate;

    const validationErrors = [];

    const applicantCode = getValue(input, 'applicant.partyCode');

    if (!applicantCode) {

        validationErrors.push({
            errorCode: 'ApplicantIsRequired',
            errorDataPath: dataPath + '/applicant/fullName'
        });
    }

    if (!input.receiveMethod) {

        validationErrors.push({
            errorCode: 'ReceiveMethodIsRequired',
            errorDataPath: dataPath + '/receiveMethod'
        });
    }

    if (!input.applicationDate) {

        validationErrors.push({
            errorCode: 'ApplicationDateIsRequired',
            errorDataPath: dataPath + '/applicationDate'
        });
    }
    else {

        if (input.applicationDate > dateNow) {

            validationErrors.push({
                errorCode: 'ApplicationDateMustBeLessOrEqualToCurrentDate',
                errorDataPath: dataPath + '/applicationDate'
            });
        }

        if (amendmentRequestIssueDate && input.applicationDate < amendmentRequestIssueDate) {

            validationErrors.push({
                errorCode: 'ApplicationDateMustBeLessOrEqualToRequestDate',
                errorDataPath: dataPath + '/applicationDate'
            });
        }
    }

    if (!input.documentsReceivedDate && documentState === 'StateBeforeActive') { // TODO: update state name after flow implementation.

        validationErrors.push({
            errorCode: 'DocumentsReceivedDateIsRequired',
            errorDataPath: dataPath + '/documentsReceivedDate'
        });
    }

    if (!amendmentRegistrationDate) {

        validationErrors.push({
            errorCode: 'RegistrationDateIsRequired',
            errorDataPath: dataPath + '/registrationDate'
        });
    }
    else if (amendmentRegistrationDate > dateNow) {

        validationErrors.push({
            errorCode: 'RegistrationDateMustBeLessOrEqualToCurrentDate',
            errorDataPath: dataPath + '/registrationDate'
        });
    }

    if (amendmentRegistrationDate < policyIssueDate) {

        validationErrors.push({
            errorCode: 'RegistrationDateMustBeAfterPolicyIssueDate',
            errorDataPath: dataPath + '/registrationDate'
        });
    }

    if (!amendmentRequestIssueDate) {

        validationErrors.push({
            errorCode: 'RequestIssueDateIsRequired',
            errorDataPath: dataPath + '/requestIssueDate'
        });
    }
    else if (amendmentRequestIssueDate > dateNow) {

        validationErrors.push({
            errorCode: 'RequestIssueDateMustBeLessOrEqualToCurrentDate',
            errorDataPath: dataPath + '/requestIssueDate'
        });
    }

    if (amendmentRequestIssueDate < policyIssueDate) {

        validationErrors.push({
            errorCode: 'RequestIssueDateMustBeAfterPolicyIssueDate',
            errorDataPath: dataPath + '/requestIssueDate'
        });
    }

    return validationErrors;
};
