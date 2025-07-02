'use strict';

const creditLifeConstants = require('@config-rgsl/credit-life-insurance/lib/creditLifeConstants');
const creditImportHelper = require('@config-rgsl/credit-life-insurance/lib/creditImportHelper');
const { productConfigurationFilter } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.hasValidationErrors) {
        throw new Error("Validation errors");
    }

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    // calc dynamic values
    const lineData = lineInput.data;
    const etlServiceInput = this.businessContext.etlServiceInput;
    const insuranceProduct = creditImportHelper.getProductBySeries(lineData.policySeries, lineData.issueDate, lineData.creditProgramId);
    const issueForm = creditImportHelper.getIssueFormBySeries(lineData.policySeries);
    const riskPremium = getRiskPremuim(lineData);

    // get product configuration
    const productCode = insuranceProduct.productCode;
    const issueDate = lineData.issueDate;
    const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);
    const productConf = productConfigurationFilter(productConfigurations, false, productCode, issueDate);

    // fill body
    const body = creditLifeConstants.creditLifeInsuranceQuoteDefaultValue;
    body.mainInsuranceConditions.partner = etlServiceInput.partner;
    body.mainInsuranceConditions.insuranceProduct = insuranceProduct;
    body.basicConditions.issueDate = lineData.issueDate;
    body.basicConditions.riskPremium = riskPremium;
    body.policyTerms.effectiveDate = lineData.startDate;
    body.policyTerms.startDate = lineData.startDate;
    body.policyTerms.endDate = lineData.endDate;
    body.creditSalesPlace.regionName = lineData.regionName;
    body.creditSalesPlace.salesPointName = lineData.salesPointName;
    body.creditSalesPlace.sellerName = lineData.sellerName;
    body.creditSalesPlace.sellerEmail = lineData.sellerEmail;
    body.creditProgram.creditProgramId = lineData.creditProgramId;
    body.creditProgram.externalContractId = lineData.externalContractId;
    body.creditContract.creditDate = lineData.creditDate;
    body.creditContract.creditContractId = lineData.creditContractId;
    body.creditContract.creditSum = lineData.creditSum;
    body.creditContract.creditRate = lineData.creditRate;
    body.creditContract.annuityPaymentSum = lineData.annuityPaymentSum;
    body.creditContract.creditSumNet = lineData.creditSum - riskPremium;
    body.creditContract.creditContractNumber = lineData.creditContractNumber;
    body.issueForm = issueForm;
    body.issueForm.email = sinkExchange.email;
    body.initiator = etlServiceInput.initiator;
    body.policyHolder.partyData = {
        partyId: sinkExchange.partyId,
        partyCode: sinkExchange.partyCode,
        partyType: "NaturalPerson"
    };
    body.insuredPerson.partyData = {
        partyId: sinkExchange.partyId,
        partyCode: sinkExchange.partyCode,
        partyType: "NaturalPerson"
    };
    body.commission.agentAgreement = etlServiceInput.agentAgreement;
    body.declarationMedicalConfirmation.isConfirmed = true;
    body.declarationMedicalConfirmation.isNotConfirmed = false;
    body.declarationMainConfirmation.isConfirmedPolicyHolder = true;
    body.declarationMainConfirmation.isNotConfirmedPolicyHolder = false;
    body.productConfiguration = productConf;

    // prepare contractNumber
    const contractNumber = lineData.policySeries + '-' + lineData.policyNumber;

    // fill result
    const result = {
        number: contractNumber,
        body: body,
        enrichFields: [
            "/mainInsuranceConditions",
            "/basicConditions",
            "/risks",
            "/policyTerms",
            "/policyHolder/**",
            "/insuredPerson/**",
            "/issueForm",
            "/beneficiaries",
            "/paymentPlan",
            "/insuranceRules",
            "/initiator",
            "/commission",
            "/creditContract",
            "/creditProgram",
            "/declarationMedical",
            "/declarationMain",
            "/uwTriggers",
            "/attachmentsPackage",
            "/technicalInformation",
            "/allocationInformation",
            "/cumulation"
        ]
    };

    return result;

    // calc functions
    function getRiskPremuim(lineData) {

        let riskPremium = lineData.riskPremiumLife;

        if (lineData.creditProgramId == 'п00312021') {
            riskPremium = lineData.riskPremiumDMS1;
        }

        if (lineData.creditProgramId == 'п00322021') {
            riskPremium = lineData.riskPremiumDMS2;
        }

        return riskPremium;

    }

};
