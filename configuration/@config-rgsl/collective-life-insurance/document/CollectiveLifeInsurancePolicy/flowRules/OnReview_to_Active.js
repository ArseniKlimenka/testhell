/**
 * @errorCode {errorCode} OnReview_to_Active_Has_Not_Issued_Inquiries
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    const validationErrors = [];

    if (body.inquiriesList.hasNotIssuedInquiries) {

        validationErrors.push({
            errorCode: "OnReview_to_Active_Has_Not_Issued_Inquiries"
        });
    }

    return validationErrors;
};
