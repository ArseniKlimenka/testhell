'use strict';

module.exports = function approveInquiryButtonVisibility(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isPostSalesInquiry = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'PostSalesInquiry');

    return isPostSalesInquiry;

};
