'use strict';

module.exports = async function onChangeIsApplicantPolicyHolder(input, ambientProperties) {

    const body = input.context.Body;
    const isApplicantPolicyHolder = body.isApplicantPolicyHolder;

    if (isApplicantPolicyHolder) {
        body.applicantFullName = body.contract?.parties?.holder?.fullName;
    } else {
        body.applicantFullName = undefined;
    }

    this.view.rebind();
};
