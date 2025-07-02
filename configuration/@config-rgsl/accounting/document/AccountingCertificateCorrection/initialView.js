'use strict';

const { LocalDate } = require('@js-joda/core');
const currentDate = LocalDate.now().toString();
const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapDetailsGetInitViewModel(input, ambientProperties) {

    if (!input.Number && input.Body) {

        input.Body.typeOfRequest = {
            code: "1",
            description: "Справка для налоговой"
        };

        input.Body.contract.type = {
            code: "life",
            description: "Договор добровольного страхования жизни"
        };

        input.Body.requestDate = currentDate;
        input.Body.correctionNumber = 0;
        input.Body.issueData.certificateIssueDate = currentDate;
        input.Body.insuredPersonData.isTaxPayerInsuredPerson = false;
        input.Body.taxPayerData.isTaxPayerPolicyHolder = true;
        input.Body.isApplicantPolicyHolder = true;
        input.Body.paymentContract.isManualCorrectionSum = false;
        input.Body.accountingCertificateEnrichments = {};
        input.Body.accountingCertificateEnrichments.enrichFields = ["**/**"];
        input.Body.accountingCertificateIncomeSource = accCertificateIncomingSource.Ui;

    }

    return input;

};
