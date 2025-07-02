'use strict';

const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const emptyText = '';

module.exports = function resultMapping(input) {

    const productsArray = this.businessContext.inputParameters.productsArray;

    const result = input.data.map(item => {

        return {
            requestNumber: item.resultData.requestNumber ? item.resultData.requestNumber : emptyText,
            requestState: item.resultData.requestState ? item.resultData.requestState : emptyText,
            contractNumber: item.resultData.contractNumber ? item.resultData.contractNumber : emptyText,
            contractStateCode: item.resultData.contractStateCode ? item.resultData.contractStateCode : emptyText,
            productCode: item.resultData.productCode ?
                productsArray.find(prArr => prArr.productCode == item.resultData.productCode).productDescription : emptyText,
            productGroup: item.resultData.productGroup ? item.resultData.productGroup : emptyText,
            partner: item.resultData.partner ? item.resultData.partner : emptyText,
            amount: item.resultData.amount ? item.resultData.amount : emptyText,
            policyHolderName: item.resultData.policyHolderName ? item.resultData.policyHolderName : emptyText,
            applicantName: item.resultData.applicantName ? item.resultData.applicantName : emptyText,
            typeOfRequest: item.resultData.typeOfRequest ? item.resultData.typeOfRequest : emptyText,
            amendmentReason: item.resultData.amendmentReason ? item.resultData.amendmentReason : emptyText,
            contractIssueDate: item.resultData.contractIssueDate ? formatHelper.formatDateTimeToString(item.resultData.contractIssueDate) : emptyText,
            requestIssueDate: item.resultData.requestIssueDate ? formatHelper.formatDateTimeToString(item.resultData.requestIssueDate) : emptyText,
            bankName: item.resultData.bankName ? item.resultData.bankName : emptyText,
            bankNumber: item.resultData.bankNumber ? item.resultData.bankNumber : emptyText
        };
    });


    return result;
};
