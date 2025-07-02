'use strict';

module.exports = function checkDepartment(input) {

    const selectedDepartment = input.rootContext.ClientViewModel.inquiriesData.department?.code ?? '';
    const departmentCodesToAllowReason = ['agentSalesSupport', 'partnerSalesSupport', 'callCenter'];

    if (!departmentCodesToAllowReason.includes(selectedDepartment)) {

        input.rootContext.ClientViewModel.inquiriesData.inquiryReasons = [];
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
    }
};
