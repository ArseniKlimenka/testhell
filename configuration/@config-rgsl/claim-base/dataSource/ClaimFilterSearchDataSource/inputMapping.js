'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {
        claimNumber: null,
        contractNumber: null,
        riskCode: null,
        stateCode: null,
        applicantCode: null,
        policyHolderCode: null,
        insuredPersonCode: null,
        insuredEventDateFrom: null,
        insuredEventDateTo: null,
        statementReceivedDateFrom: null,
        statementReceivedDateTo: null,
        statementApplicationDateFrom: null,
        statementApplicationDateTo: null
    };

    if (input.data.criteria.documentCode) {

        output.parameters.claimNumber = input.data.criteria.documentCode;
    }

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.riskCode) {

        output.parameters.riskCode = input.data.criteria.riskCode;
    }

    if (input.data.criteria.documentState) {

        output.parameters.stateCode = input.data.criteria.documentState;
    }

    if (input.data.criteria.applicantCode) {

        output.parameters.applicantCode = input.data.criteria.applicantCode;
    }

    if (input.data.criteria.policyHolderCode) {

        output.parameters.policyHolderCode = input.data.criteria.policyHolderCode;
    }

    if (input.data.criteria.insuredPersonCode) {

        output.parameters.insuredPersonCode = input.data.criteria.insuredPersonCode;
    }

    if (input.data.criteria.insuredEventDateFrom) {

        output.parameters.insuredEventDateFrom = input.data.criteria.insuredEventDateFrom;
    }

    if (input.data.criteria.insuredEventDateTo) {

        output.parameters.insuredEventDateTo = input.data.criteria.insuredEventDateTo;
    }

    if (input.data.criteria.statementReceivedDateFrom) {

        output.parameters.statementReceivedDateFrom = input.data.criteria.statementReceivedDateFrom;
    }

    if (input.data.criteria.statementReceivedDateTo) {

        output.parameters.statementReceivedDateTo = input.data.criteria.statementReceivedDateTo;
    }

    if (input.data.criteria.statementApplicationDateFrom) {

        output.parameters.statementApplicationDateFrom = input.data.criteria.statementApplicationDateFrom;
    }

    if (input.data.criteria.statementApplicationDateTo) {

        output.parameters.statementApplicationDateTo = input.data.criteria.statementApplicationDateTo;
    }

    return output;
};
