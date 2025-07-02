module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.assigneeId = null;
    output.parameters.claimNumber = null;
    output.parameters.contractNumber = null;
    output.parameters.insuredEventNumber = null;
    output.parameters.activityDateFrom = null;
    output.parameters.activityDateDateTo = null;
    output.parameters.statementApplicationDateFrom = null;
    output.parameters.statementApplicationDateTo = null;
    output.parameters.insuredEventDateFrom = null;
    output.parameters.insuredEventDateTo = null;
    output.parameters.productCode = null;
    output.parameters.productGroup = null;

    if (input.data.criteria.assigneeId) {

        output.parameters.assigneeId = input.data.criteria.assigneeId;
    }

    if (input.data.criteria.claimNumber) {

        output.parameters.claimNumber = input.data.criteria.claimNumber;
    }

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.insuredEventNumber) {

        output.parameters.insuredEventNumber = input.data.criteria.insuredEventNumber;
    }

    if (input.data.criteria.activityDateFrom) {

        output.parameters.activityDateFrom = input.data.criteria.activityDateFrom;
    }

    if (input.data.criteria.activityDateDateTo) {

        output.parameters.activityDateDateTo = input.data.criteria.activityDateDateTo;
    }

    if (input.data.criteria.statementApplicationDateFrom) {

        output.parameters.statementApplicationDateFrom = input.data.criteria.statementApplicationDateFrom;
    }

    if (input.data.criteria.statementApplicationDateTo) {

        output.parameters.statementApplicationDateTo = input.data.criteria.statementApplicationDateTo;
    }

    if (input.data.criteria.insuredEventDateFrom) {

        output.parameters.insuredEventDateFrom = input.data.criteria.insuredEventDateFrom;
    }

    if (input.data.criteria.insuredEventDateTo) {

        output.parameters.insuredEventDateTo = input.data.criteria.insuredEventDateTo;
    }

    if (input.data.criteria.product?.productCode) {

        output.parameters.productCode = input.data.criteria.product.productCode;
    }

    if (input.data.criteria.productGroup) {

        output.parameters.productGroup = input.data.criteria.productGroup;
    }

    if (input.data.criteria.policyHolderCode) {

        output.parameters.policyHolderCode = input.data.criteria.policyHolderCode;
    }

    if (input.data.criteria.productGroup) {

        output.parameters.policyHolderType = input.data.criteria.policyHolderType;
    }

    return output;
};
