'use strict';
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { paymentOrderSubType } = require("@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst");

function checkNonAcceptance (poInfo) {
    const isClaim = poInfo.paymentOrderType === paymentOrderType.Claim;
    const nonAcceptance = poInfo.nonAcceptance;

    return isClaim && nonAcceptance;
}

function getRequestData(paymentOrderNumber, body, actData, aaData, contractData, recipientData, claimRiskInformationData) {
    const poType = body.paymentOrderInformation.paymentOrderType;
    const poSubType = body.paymentOrderInformation.paymentOrderSubType;
    const isCommissionAct = poType === paymentOrderType.Commission;
    const isRefund = poType === paymentOrderType.PaymentRefund;
    const partyType = recipientData.partyType.toString();
    const recipientIsNaturalPerson = partyType == "NaturalPerson";
    const riskType = claimRiskInformationData?.riskType;
    const riskIsNonLife = riskType == "nonLife";

    return {
        tin: recipientData.commonBody.attributes?.INNKIO ?? '',
        name: partyType === partyConstants.partyType.LegalEntity ? recipientData.commonBody.fullName : '',
        FIOname: partyType === partyConstants.partyType.LegalEntity ? '' : recipientData.commonBody.firstName,
        FIOsurname: partyType === partyConstants.partyType.LegalEntity ? '' : recipientData.commonBody.lastName,
        FIOmiddlename: partyType === partyConstants.partyType.LegalEntity ? '' : recipientData.commonBody.attributes?.middleName,
        kpp: recipientData.commonBody.attributes?.KPP ?? '',
        partyType: partyType === partyConstants.partyType.LegalEntity ? 'Юридическое лицо' : 'Физическое Лицо',
        invoiceAmount: body.paymentOrderAmounts.totalPaymentAmount,
        invoiceCurrency: body.paymentOrderAmounts.paymentCurrencyCode,
        vatText: body.paymentOrderAmounts.taxAmountLC > 0 ? 'НДС20' : 'БезНДС',
        vatAmount: body.paymentOrderAmounts.taxAmountLC ?? 0,
        invoiceNumber: body.paymentOrderInformation.referenceNumber,
        invoiceDate: body.paymentOrderInformation.paymentOrderDate,
        ksp: isCommissionAct ? aaData.mvzNumber : isRefund ? '99-00-000' : '80-20-001',
        accountOrganization: body.paymentOrderInformation.payerBankAccountNumber,
        serviceField: recipientData.partyCode,
        agreementNumber: actData?.aaNumber ?? contractData?.number ?? paymentOrderNumber,
        agreementDate: aaData?.conclusionDate ?? contractData?.issueDate ?? body.paymentOrderInformation.paymentOrderDate,
        sessionId: paymentOrderNumber,
        dds: getDDS(poType, poSubType, riskIsNonLife, recipientIsNaturalPerson),
        recipientAccount: body.recipientInformation.bankAccount?.bankAccountNumber,
        recipientBank: body.recipientInformation.bankAccount?.bankName,
        recipientBIC: body.recipientInformation.bankAccount?.bankBIC,
    };
}

function getXmlRequest(data) {
    return `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:koss="http://www.pfergo.org/koss" xmlns:hi="http://www.sample-package.org/Hi">
	<soap:Header/>
	<soap:Body>
		<koss:AddBill>
			<koss:request>
				<hi:INN>${data.tin}</hi:INN>
				<hi:Name>${data.name}</hi:Name>
				<hi:KPP>${data.kpp}</hi:KPP>
				<hi:ULOrFL>${data.partyType}</hi:ULOrFL>
				<hi:CodeOKPO/>
				<hi:BankAccount>
					<hi:AccountNumber>${data.recipientAccount}</hi:AccountNumber>
					<hi:AccountType>Расчетный</hi:AccountType>
					<hi:Bank>
						<hi:Bank>${data.recipientBank}</hi:Bank>
						<hi:BIK>${data.recipientBIC}</hi:BIK>
						<hi:Country>RU</hi:Country>
					</hi:Bank>
				</hi:BankAccount>
				<hi:InvoiceAmount>${data.invoiceAmount}</hi:InvoiceAmount>
				<hi:InvoiceCurrency>${data.invoiceCurrency}</hi:InvoiceCurrency>
				<hi:CodeOrganization>ООО «СК «ЭРГО Жизнь»</hi:CodeOrganization>
				<hi:VATRate>${data.vatText}</hi:VATRate>
				<hi:VATAmount>${data.vatAmount}</hi:VATAmount>
				<hi:InvoiceNumber>${data.invoiceNumber}</hi:InvoiceNumber>
				<hi:InvoiceDate>${data.invoiceDate}</hi:InvoiceDate>
				<hi:KSP>
					<hi:KSP>${data.ksp}</hi:KSP>
				</hi:KSP>
				<hi:AccountOrganization>${data.accountOrganization}</hi:AccountOrganization>
				<hi:FIOSurname>${data.FIOsurname}</hi:FIOSurname>
				<hi:FIOName>${data.FIOname}</hi:FIOName>
				<hi:FIOMiddleName>${data.FIOmiddlename}</hi:FIOMiddleName>
				<hi:Country>Россия</hi:Country>
				<hi:ServiceField>${data.serviceField}</hi:ServiceField>
				<hi:Agreement_Number>${data.agreementNumber}</hi:Agreement_Number>
				<hi:Agreement_Date>${data.agreementDate}</hi:Agreement_Date>
				<hi:LegalAddressLink>
					<hi:Country>Россия</hi:Country>
					<hi:Postcode>123610</hi:Postcode>
					<hi:City>Москва</hi:City>
					<hi:Street>Краснопресненская наб.</hi:Street>
					<hi:Building>12</hi:Building>
					<hi:Housing>2</hi:Housing>
					<hi:Room>5</hi:Room>
					<hi:Remark/>
				</hi:LegalAddressLink>
				<hi:Session_ID>${data.sessionId}</hi:Session_ID>
				<hi:SystemId>ADINSURE</hi:SystemId>
				<hi:DDS>${data.dds}</hi:DDS>
			</koss:request>
		</koss:AddBill>
	</soap:Body>
</soap:Envelope>
`;
}

function getDDS(poType, poSubType, riskIsNonLife, recipientIsNaturalPerson) {

    switch (poType) {
        case paymentOrderType.PaymentRefund:
            return '2660';
        case paymentOrderType.Commission:
            return '2111';
        case paymentOrderType.PolicyCancellation:
            return poSubType === paymentOrderSubType.CancellationPIT ? '2600' : '2640';
        case paymentOrderType.Claim:
            if (!riskIsNonLife) {
                return '2631';
            }
            if (recipientIsNaturalPerson) {
                return '2630';
            }
            return '2621';
    }

    throw new Error('Not supported payment order type: ' + paymentOrderType);
}

module.exports = {
    checkNonAcceptance,
    getRequestData,
    getXmlRequest,
};
