'use static';
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const certificatesDataArray = sinkResult.data.map(_ => _.resultData);
    sinkExchange.requestArray = [];

    certificatesDataArray.forEach((item) => {

        const certificateBody = JSON.parse(item.body);

        const certificateRequest = {

            SoftwareVersion: sinkExchange.softwareVersion?.ServerVersion,
            UniversalVersionedDocumentId: item.universalVersionedDocumentId,
            UniversalVersionedDocumentNo: item.accountingCertificateNumber,
            InsurerINN: printoutsConstant.insurerInfo?.INN,
            InsurerKPP: printoutsConstant.insurerInfo?.KPP,
            CertificateIssueDate: certificateBody?.issueData?.certificateIssueDate,
            AccountingYear: certificateBody?.accountingYear?.year,
            CorrectionNumber: certificateBody?.correctionNumber,
            IsTaxPayerInsuredPerson: certificateBody?.insuredPersonData?.isTaxPayerInsuredPerson,
            ContractTypeCode: certificateBody?.contract?.type?.code,
            ContractStartDate: certificateBody?.contract?.startDate,
            ContractNumber: certificateBody?.contract?.number,
            PaymentContractAmountOfPremiumsPaid: certificateBody?.paymentContract?.amountOfPremiumsPaid ?? 0.0,
            TaxPayerINNKIO: certificateBody?.taxPayerData?.INNKIO,
            TaxPayerDataDateOfBirth: certificateBody?.taxPayerData?.dateOfBirth,
            TaxPayerDocumentCodeView: certificateBody?.taxPayerData?.documentCodeView,
            TaxPayerDocSeriesNumber: `${certificateBody?.taxPayerData?.docSeries}${certificateBody?.taxPayerData?.docNumber}`,
            TaxPayerIssueDate: certificateBody?.insuredPersonData?.issueDate,
            TaxPayerLastName: certificateBody?.insuredPersonData?.lastName,
            TaxPayerFirstName: certificateBody?.insuredPersonData?.firstName,
            TaxPayerMiddleName: certificateBody?.insuredPersonData?.middleName,
            InsuredPersonINNKIO: certificateBody?.insuredPersonData?.INNKIO,
            InsuredPersonDataDateOfBirth: certificateBody?.insuredPersonData?.dateOfBirth,
            InsuredPersonDocumentCodeView: certificateBody?.insuredPersonData?.documentCodeView,
            InsuredPersonDocSeriesNumber: `${certificateBody?.insuredPersonData?.docSeries}${certificateBody?.insuredPersonData?.docNumber}`,
            InsuredPersonIssueDate: certificateBody?.insuredPersonData?.issueDate,
            InsuredPersonLastName: certificateBody?.insuredPersonData?.lastName,
            InsuredPersonFirstName: certificateBody?.insuredPersonData?.firstName,
            InsuredPersonMiddleName: certificateBody?.insuredPersonData?.middleName
        };
        sinkExchange.requestArray.push(certificateRequest);
    });

};
