'use strict';

const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const { paymentLineType, paymentMethod, bankAccount, paymentOrderSubType, paymentDescriptionCode } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency, monthStringName } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { amendmentReason, amendmentPaymentLineType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { endowmentPaymentLineType, claimPaymentLineType, beneficiaryPaymentTypes } = require('@config-rgsl/claim-base/lib/claimConsts');

function setCommonPaymentOrderData(paymentOrder, inputData) {

    paymentOrder.paymentOrderInformation = {
        paymentOrderType: inputData.paymentOrderType,
        referenceNumber: inputData.referenceNumber,
        paymentMethod: paymentMethod.WireTransfer,
        paymentOrderDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT),
        isManual: false
    };
    paymentOrder.paymentOrderAmounts.comments = inputData.comments;
}

function setDataForPaymentRefund(paymentOrder, inputData, manualAmount) {

    const amount = manualAmount ?? inputData.paymentData.openAmount;

    paymentOrder.paymentOrderInformation.contractNumber = inputData.contractData?.contractNumber;
    paymentOrder.paymentOrderInformation.contractAmendmentNumber = inputData.contractData?.amendmentNumber;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.paymentData.debtorName;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.paymentData.creditorAccountNo;
    paymentOrder.paymentOrderInformation.isAcquiring = inputData.paymentData.isAcquiring;
    paymentOrder.paymentOrderInformation.nonAcceptance = inputData.paymentData.nonAcceptance;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = inputData.paymentData.currencyCode;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = inputData.paymentData.currencyCode; // payment refund is always done in the same currency as payment
    const exchangeRate = 1.0;
    paymentOrder.paymentOrderAmounts.exchangeRate = exchangeRate;
    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = amount;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = amount; // payment refund is always done in the same currency as payment
    paymentOrder.paymentOrderAmounts.originalTotalAmount = amount;

    paymentOrder.recipientInformation.bankAccountNumber = inputData.paymentData.debtorAccountNo;

    if (inputData.partyData) {

        paymentOrder.recipientInformation.partyCodeName = inputData.partyData.partyCode;
        paymentOrder.recipientInformation.partyFullName = inputData.partyData.fullName;
        paymentOrder.recipientInformation.partyType = inputData.partyData.partyType;
        paymentOrder.recipientInformation.innNumber = inputData.partyData.INN;
        paymentOrder.recipientInformation.kppNumber = inputData.partyData.KPP;
        paymentOrder.recipientInformation.isNonResident = inputData.partyData.isNonResident;

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = inputData.partyData.partyBankAccount;
        paymentOrder.recipientInformation.bankAccount.bankBIC = inputData.partyData.bankAccountBankCode;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = inputData.partyData.corrBankAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = inputData.partyData.bankAccountCurrencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = inputData.partyData.partyBankAccountName;
    }
    else {

        paymentOrder.recipientInformation.partyFullName = inputData.paymentData.debtorName;
    }

    paymentOrder.paymentOrderItems = [];
    paymentOrder.paymentOrderItems.push(
        {
            itemType: paymentLineType.paymentRefund,
            paymentOrderCurrencyAmount: amount,
            paymentCurrencyAmount: amount * exchangeRate,
        }
    );

    let refNumbers = 'НОМЕР ОТСУТСТВУЕТ';

    if (inputData.paymentData.referenceNumbers) {

        refNumbers = inputData.paymentData.referenceNumbers;
    }

    const descriptionCode = paymentOrder.recipientInformation.isNonResident ? paymentDescriptionCode.nonResidentPaymentRefund + ' ' : '';
    const description = `${descriptionCode}Возврат страховой премии по договору ${refNumbers}. Сумма ${amount}. Без налога (НДС)`;
    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

function setCommonDataForPolicyCancellation(paymentOrder, inputData) {

    paymentOrder.paymentOrderInformation.contractNumber = inputData.contractData.contractNumber;
    paymentOrder.paymentOrderInformation.contractAmendmentNumber = inputData.contractData.amendmentNumber;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.contractData.policyCurrency === currency.localCurrency ? inputData.defaultBankAccountNo : undefined;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = currency.localCurrency;
}

function setDataForPolicyCancellation(paymentOrder, inputData) {

    setCommonDataForPolicyCancellation(paymentOrder, inputData);

    paymentOrder.paymentOrderInformation.insuranceAct = {
        actNumber: inputData.insuranceActNumber,
        actDate: inputData.insuranceActDate,
        executorFullName: inputData.insuranceActExecutor,
        executorPartyCode: inputData.insuranceActExecutorCode,
        signedOn: inputData.directorSignerData?.signedDateTime,
        signerFullName: inputData.directorSignerData?.signedBy,
        signerPartyCode: inputData.directorSignerData?.signedByCode,
        signerUsername: inputData.directorSignerData?.signedByUser
    };

    paymentOrder.paymentOrderInformation.isCoolOffPeriod = inputData.contractData?.cancellationReason === amendmentReason.byClientCoolOff;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
    paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
    paymentOrder.recipientInformation.innNumber = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
    paymentOrder.recipientInformation.kppNumber = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    paymentOrder.recipientInformation.isNonResident = getValue(inputData, 'recipientPartyData.body.partyGeneralData.isNonResident');

    const recipientBankAccount = inputData.contractData.recipientBankAccountToSet;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = inputData.contractData.policyCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = inputData.contractData.exchangeRate;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = recipientBankAccount ? recipientBankAccount.currency.currencyCode : currency.localCurrency;

    paymentOrder.paymentOrderAmounts.fixedExchangeRate = inputData.contractData.fixedExchangeRate;
    paymentOrder.paymentOrderAmounts.useFixedExchangeRateInitial = inputData.contractData.useFixedExchangeRate;

    paymentOrder.paymentOrderAmounts.useFixedExchangeRate = paymentOrder.paymentOrderAmounts.paymentCurrencyCode === currency.localCurrency ?
        inputData.contractData.useFixedExchangeRate : false;

    const useFixedExchangeRate = paymentOrder.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? paymentOrder.paymentOrderAmounts.fixedExchangeRate : paymentOrder.paymentOrderAmounts.exchangeRate;

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = inputData.contractData.recipientAmountDocCurrency;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = inputData.contractData.convertedCancellationAmount;
    paymentOrder.paymentOrderAmounts.originalTotalAmount = inputData.contractData.convertedCancellationAmount;

    const descriptionCode = paymentOrder.recipientInformation.isNonResident ? paymentDescriptionCode.nonResident + ' ' : '';

    if (inputData.contractData?.cancellationReason && inputData.contractData?.contractNumber && inputData.contractData?.convertedCancellationAmount) {

        let description;
        switch (inputData.contractData.cancellationReason) {
            case amendmentReason.byClientCoolOff:
                description = `${descriptionCode}Возврат страховой премии по договору страхования ${inputData.contractData.contractNumber} Сумма ${inputData.contractData.convertedCancellationAmount}. Без налога (НДС)`;
                break;
            case amendmentReason.creditRepayment:
                description = `${descriptionCode}Возврат неиспользованной части страховой премии по договору страхования ${inputData.contractData.contractNumber} Сумма ${inputData.contractData.convertedCancellationAmount}. Без налога (НДС)`;
                break;
            case amendmentReason.byClientNonCoolOff:
                description = `${descriptionCode}Выплата выкупной суммы по договору страхования ${inputData.contractData.contractNumber} Сумма ${inputData.contractData.convertedCancellationAmount}. Без налога (НДС)`;
                break;
        }

        paymentOrder.paymentOrderAmounts.paymentDescription = description;
    }

    const paymentLines = inputData.contractData.paymentLines;
    const percentage = inputData.contractData.recipientAmountPercentage ? parseFloat(inputData.contractData.recipientAmountPercentage) : 0;

    const pitLine = paymentLines.find(i => i.paymentType === amendmentPaymentLineType.pit);
    const surrenderValueLine = paymentLines.find(i => i.paymentType === amendmentPaymentLineType.surrenderValue);
    const investProfitLine = paymentLines.find(i => i.paymentType === amendmentPaymentLineType.investProfit);
    const paymentRefundline = paymentLines.find(i => i.paymentType === amendmentPaymentLineType.paymentRefund);
    const creditRefundline = paymentLines.find(i => i.paymentType === amendmentPaymentLineType.creditRefund);

    const pitAmountInRub = pitLine ? parseFloat(pitLine.paymentSumInRub) : 0;
    const pitAmount = pitLine ? round(pitAmountInRub / exchangeRate) : 0;
    const surrenderValueLineAmount = (surrenderValueLine ? parseFloat(surrenderValueLine.paymentSum) : 0) - pitAmount;
    const investProfitLineAmount = investProfitLine ? parseFloat(investProfitLine.paymentSum) : 0;
    const paymentRefundlineAmount = paymentRefundline ? parseFloat(paymentRefundline.paymentSum) : 0;
    const creditRefundlineAmount = creditRefundline ? parseFloat(creditRefundline.paymentSum) : 0;

    paymentOrder.paymentOrderItems = [];

    if (surrenderValueLineAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.surrenderValue,
                paymentOrderCurrencyAmount: round(surrenderValueLineAmount * percentage),
                paymentCurrencyAmount: round(surrenderValueLineAmount * exchangeRate * percentage)
            }
        );
    }

    if (investProfitLineAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.investProfit,
                paymentOrderCurrencyAmount: round(investProfitLineAmount * percentage),
                paymentCurrencyAmount: round(investProfitLineAmount * exchangeRate * percentage)
            }
        );
    }

    if (paymentRefundlineAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.paymentRefund,
                paymentOrderCurrencyAmount: round(paymentRefundlineAmount * percentage),
                paymentCurrencyAmount: round(paymentRefundlineAmount * exchangeRate * percentage)
            }
        );
    }

    if (creditRefundlineAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.creditRefund,
                paymentOrderCurrencyAmount: round(creditRefundlineAmount * percentage),
                paymentCurrencyAmount: round(creditRefundlineAmount * exchangeRate * percentage)
            }
        );
    }

    if (pitAmountInRub > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.PIT,
                paymentOrderCurrencyAmount: undefined,
                paymentCurrencyAmount: pitAmountInRub,
            }
        );
    }
}

function setPITDataForPolicyCancellation(paymentOrder, inputData) {

    setCommonDataForPolicyCancellation(paymentOrder, inputData);

    paymentOrder.paymentOrderInformation.paymentOrderSubType = paymentOrderSubType.CancellationPIT;
    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = currency.localCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = inputData.contractData.exchangeRate;

    if (inputData.recipientPartyData) {

        paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;
        paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
        paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
        paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
        paymentOrder.recipientInformation.innNumber = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
        paymentOrder.recipientInformation.kppNumber = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    }

    let recipientBankAccounts = getValue(inputData, 'recipientPartyData.body.partyBankAccounts', []);
    recipientBankAccounts = recipientBankAccounts.filter(acc => !acc.closingDate);
    const recipientBankAccount = recipientBankAccounts.find(account => account.currency.currencyCode === currency.localCurrency);

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = 0;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = 0;
    paymentOrder.paymentOrderAmounts.originalTotalAmount = 0;
    const pitAmount = inputData.contractData.recipientPitAmountRubCurrency ? parseFloat(inputData.contractData.recipientPitAmountRubCurrency) : 0;

    if (pitAmount > 0) {

        const convertedPitLine = {
            itemType: paymentLineType.PIT,
            paymentOrderCurrencyAmount: pitAmount,
            paymentCurrencyAmount: pitAmount
        };

        paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = pitAmount;
        paymentOrder.paymentOrderAmounts.totalPaymentAmount = pitAmount;
        paymentOrder.paymentOrderItems = [];
        paymentOrder.paymentOrderItems.push(convertedPitLine);
    }

    const month = dateHelper.getMonth(paymentOrder.paymentOrderInformation.paymentOrderDate);
    const year = dateHelper.getYear(paymentOrder.paymentOrderInformation.paymentOrderDate);

    const description = `Перечисляется НДФЛ за ${monthStringName[month]} ${year} г. без налога НДС.`;
    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

function setDataForCommission(paymentOrder, inputData) {

    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.defaultBankAccountNo;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
    paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
    paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;

    const inn = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
    const kpp = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    paymentOrder.recipientInformation.innNumber = inn;
    paymentOrder.recipientInformation.kppNumber = kpp;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = currency.localCurrency;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = currency.localCurrency;
    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = inputData.commissionActData.commAmountLc;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = inputData.commissionActData.commAmountLc;
    paymentOrder.paymentOrderAmounts.originalTotalAmount = inputData.commissionActData.commAmountLc;
    paymentOrder.paymentOrderAmounts.taxAmountLC = inputData.commissionActData.vatAmountLc;

    let recipientBankAccounts = getValue(inputData, 'recipientPartyData.body.partyBankAccounts', []);
    recipientBankAccounts = recipientBankAccounts.filter(acc => !acc.closingDate);
    let recipientBankAccount = recipientBankAccounts.find(account => account.number === inputData.agentAgreementData?.bankAccountNumber);
    if (!recipientBankAccount) {
        recipientBankAccount = recipientBankAccounts.find(account => account.currency.currencyCode === currency.localCurrency);
    }

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    if (inputData.commissionActData && inputData.agentAgreementData) {
        const useNds = inputData.agentAgreementData.useNds;
        const actNo = inputData.commissionActData.actNo;
        const actIssueDate = dateHelper.formatDate(inputData.commissionActData.actIssueDate, dateHelper.DateFormats.CALENDAR);
        const reportingPeriodFrom = dateHelper.formatDate(inputData.commissionActData.reportingPeriodFrom, dateHelper.DateFormats.CALENDAR);
        const reportingPeriodTo = dateHelper.formatDate(inputData.commissionActData.reportingPeriodTo, dateHelper.DateFormats.CALENDAR);
        const externalNumber = inputData.agentAgreementData.externalNumber;
        const conclusionDate = dateHelper.formatDate(inputData.agentAgreementData.conclusionDate, dateHelper.DateFormats.CALENDAR);
        const vatRate = inputData.commissionActData.vatRate;
        const vatAmountLc = inputData.commissionActData.vatAmountLc;
        const commAmountLc = inputData.commissionActData.commAmountLc;
        const formatVatAmountLc = formatAmount(vatAmountLc);
        const formatCommAmountLc = formatAmount(commAmountLc);

        const taxMessage = useNds && vatRate && vatAmountLc && vatAmountLc > 0 ?
            `в том числе НДС (${vatRate * 100}%) в размере ${formatVatAmountLc} р.` :
            `без НДС`;

        const description = `Оплата вознаграждения по акту № ${actNo} от ${actIssueDate} за период с ${reportingPeriodFrom} по ${reportingPeriodTo} по договору №${externalNumber} от ${conclusionDate},\nСумма ${formatCommAmountLc} р., ${taxMessage}`;

        paymentOrder.paymentOrderAmounts.paymentDescription = description;
    }
}

function formatAmount(amount) {
    return amount
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // format to 1.000,00
}

function setDataForClaim(paymentOrder, inputData, integrationServiceInput) {

    paymentOrder.paymentOrderInformation.insuranceAct = {
        actNumber: inputData.insuranceActNumber,
        actDate: inputData.insuranceActDate,
        executorFullName: inputData.insuranceActExecutor,
        executorPartyCode: inputData.insuranceActExecutorCode,
        signedOn: inputData.signedDateTime,
        signerFullName: inputData.signedBy,
        signerPartyCode: inputData.signedByCode,
        signerUsername: inputData.signedByUser
    };

    paymentOrder.paymentOrderInformation.contractNumber = inputData.claimData.contractNumber;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.claimData.contractCurrency === currency.localCurrency ? inputData.defaultBankAccountNo : undefined;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;

    paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
    paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
    paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.innNumber = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
    paymentOrder.recipientInformation.kppNumber = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    paymentOrder.recipientInformation.isNonResident = getValue(inputData, 'recipientPartyData.body.partyGeneralData.isNonResident');

    paymentOrder.paymentOrderInformation.shouldUseNetting = inputData.claimData.shouldUseNetting;
    paymentOrder.paymentOrderInformation.nonAcceptance = inputData.claimData.nonAcceptance;
    paymentOrder.paymentOrderInformation.numberOfNonAcceptancePayment = inputData.claimData.numberOfNonAcceptancePayment;

    const recipientBankAccount = inputData.claimData.recipientBankAccountToSet;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = inputData.claimData.contractCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = inputData.claimData.exchangeRate;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = recipientBankAccount ? recipientBankAccount.currency.currencyCode : currency.localCurrency;

    paymentOrder.paymentOrderAmounts.fixedExchangeRate = inputData.claimData.fixedExchangeRate;
    paymentOrder.paymentOrderAmounts.useFixedExchangeRateInitial = inputData.claimData.useFixedExchangeRate;

    paymentOrder.paymentOrderAmounts.useFixedExchangeRate = paymentOrder.paymentOrderAmounts.paymentCurrencyCode === currency.localCurrency ?
        inputData.claimData.useFixedExchangeRate : false;

    const useFixedExchangeRate = paymentOrder.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? paymentOrder.paymentOrderAmounts.fixedExchangeRate : paymentOrder.paymentOrderAmounts.exchangeRate;

    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = inputData.claimData.amountInContractCurrency;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = round(inputData.claimData.amountInContractCurrency * exchangeRate);
    paymentOrder.paymentOrderAmounts.originalTotalAmount = paymentOrder.paymentOrderAmounts.totalPaymentAmount;

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    const paymentLines = inputData.claimData.paymentLines;
    const percentage = inputData.claimData.amountToPayPercentage ? parseFloat(inputData.claimData.amountToPayPercentage) : 0;
    const mainAmountLine = paymentLines.find(l => l.lineType === claimPaymentLineType.mainAmount);
    const mainAmountLineAmount = mainAmountLine ? parseFloat(mainAmountLine.lineAmountInContractCurrency) : 0;
    const investProfitSlpLine = paymentLines.find(l => l.lineType === claimPaymentLineType.invProfitSlp);
    const investProfitSlpLineAmount = investProfitSlpLine ? parseFloat(investProfitSlpLine.lineAmountInContractCurrency) : 0;

    paymentOrder.paymentOrderItems = [
        {
            itemType: paymentLineType.riskPayment,
            paymentOrderCurrencyAmount: round(mainAmountLineAmount * percentage),
            paymentCurrencyAmount: round(mainAmountLineAmount * exchangeRate * percentage)
        }
    ];

    if (investProfitSlpLineAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.investProfitSlp,
                paymentOrderCurrencyAmount: round(investProfitSlpLineAmount * percentage),
                paymentCurrencyAmount: round(investProfitSlpLineAmount * exchangeRate * percentage)
            }
        );
    }

    const descriptionCode = paymentOrder.recipientInformation.isNonResident ? paymentDescriptionCode.nonResident + ' ' : '';
    const description = `${descriptionCode}Страховая выплата Убыток ${integrationServiceInput.referenceNumber} по акту ${inputData.insuranceActNumber} от ${printoutUtils.formatDatePrint(inputData.insuranceActDate)}. Договор ${inputData.claimData.contractNumber}.  Сумма ${inputData.claimData.convertedAmount}. Без налога (НДС)`;

    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

function setDataForCollectiveClaim(paymentOrder, inputData, integrationServiceInput) {

    paymentOrder.paymentOrderInformation.insuranceAct = {
        actNumber: inputData.insuranceActNumber,
        actDate: inputData.insuranceActDate,
        executorFullName: inputData.insuranceActExecutor,
        executorPartyCode: inputData.insuranceActExecutorCode,
        signedOn: inputData.signedDateTime,
        signerFullName: inputData.signedBy,
        signerPartyCode: inputData.signedByCode,
        signerUsername: inputData.signedByUser
    };

    paymentOrder.paymentOrderInformation.contractNumber = inputData.claimData.contractNumber;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.claimData.contractCurrency === currency.localCurrency ? inputData.defaultBankAccountNo : undefined;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;

    paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
    paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
    paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.innNumber = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
    paymentOrder.recipientInformation.kppNumber = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    paymentOrder.recipientInformation.isNonResident = getValue(inputData, 'recipientPartyData.body.partyGeneralData.isNonResident');

    paymentOrder.paymentOrderInformation.shouldUseNetting = inputData.claimData.shouldUseNetting;
    paymentOrder.paymentOrderInformation.nonAcceptance = inputData.claimData.nonAcceptance;
    paymentOrder.paymentOrderInformation.numberOfNonAcceptancePayment = inputData.claimData.numberOfNonAcceptancePayment;

    const recipientBankAccount = inputData.claimData.recipientBankAccountToSet;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = inputData.claimData.contractCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = inputData.claimData.exchangeRate;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = recipientBankAccount ? recipientBankAccount.currency.currencyCode : currency.localCurrency;

    paymentOrder.paymentOrderAmounts.fixedExchangeRate = inputData.claimData.fixedExchangeRate;
    paymentOrder.paymentOrderAmounts.useFixedExchangeRateInitial = inputData.claimData.useFixedExchangeRate;

    paymentOrder.paymentOrderAmounts.useFixedExchangeRate = paymentOrder.paymentOrderAmounts.paymentCurrencyCode === currency.localCurrency ?
        inputData.claimData.useFixedExchangeRate : false;

    const useFixedExchangeRate = paymentOrder.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? paymentOrder.paymentOrderAmounts.fixedExchangeRate : paymentOrder.paymentOrderAmounts.exchangeRate;

    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = inputData.claimData.amountInContractCurrency;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = round(inputData.claimData.amountInContractCurrency * exchangeRate);
    paymentOrder.paymentOrderAmounts.originalTotalAmount = paymentOrder.paymentOrderAmounts.totalPaymentAmount;

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    paymentOrder.paymentOrderItems = [
        {
            itemType: paymentLineType.riskPayment,
            paymentOrderCurrencyAmount: inputData.claimData.amountInContractCurrency,
            paymentCurrencyAmount: paymentOrder.paymentOrderAmounts.totalPaymentAmount
        }
    ];

    paymentOrder.paymentOrderInformation.paymentOrderSubType = paymentOrderSubType.Collective;
    const descriptionCode = paymentOrder.recipientInformation.isNonResident ? paymentDescriptionCode.nonResident + ' ' : '';
    const description = `${descriptionCode}Страховая выплата Убыток ${integrationServiceInput.referenceNumber} по акту ${inputData.insuranceActNumber} от ${printoutUtils.formatDatePrint(inputData.insuranceActDate)}. Договор ${inputData.claimData.contractNumber}.  Сумма ${inputData.claimData.convertedAmount}. Без налога (НДС)`;

    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

function setDataForEndowment(paymentOrder, inputData, integrationServiceInput) {

    paymentOrder.paymentOrderInformation.insuranceAct = {
        actNumber: inputData.insuranceActNumber,
        actDate: inputData.insuranceActDate,
        executorFullName: inputData.insuranceActExecutor,
        executorPartyCode: inputData.insuranceActExecutorCode
    };

    paymentOrder.paymentOrderInformation.contractNumber = inputData.endowmentData.contractNumber;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.endowmentData.contractCurrency === currency.localCurrency ? inputData.defaultBankAccountNo : undefined;
    paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;

    paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
    paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
    paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
    paymentOrder.recipientInformation.innNumber = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
    paymentOrder.recipientInformation.kppNumber = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
    paymentOrder.recipientInformation.isNonResident = getValue(inputData, 'recipientPartyData.body.partyGeneralData.isNonResident');

    paymentOrder.paymentOrderInformation.shouldUseNetting = inputData.endowmentData.paymentTypeCode === beneficiaryPaymentTypes.netting;

    paymentOrder.paymentOrderInformation.nonAcceptance = inputData.endowmentData.nonAcceptance;
    paymentOrder.paymentOrderInformation.numberOfNonAcceptancePayment = inputData.endowmentData.numberOfNonAcceptancePayment;

    const recipientBankAccount = inputData.endowmentData.recipientBankAccountToSet;

    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = inputData.endowmentData.contractCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = inputData.endowmentData.exchangeRate;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = recipientBankAccount ? recipientBankAccount.currency.currencyCode : currency.localCurrency;

    paymentOrder.paymentOrderAmounts.fixedExchangeRate = inputData.endowmentData.fixedExchangeRate;
    paymentOrder.paymentOrderAmounts.useFixedExchangeRateInitial = inputData.endowmentData.useFixedExchangeRate;
    paymentOrder.paymentOrderAmounts.useFixedExchangeRate = paymentOrder.paymentOrderAmounts.paymentCurrencyCode === currency.localCurrency ?
        inputData.endowmentData.useFixedExchangeRate : false;

    const useFixedExchangeRate = paymentOrder.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? paymentOrder.paymentOrderAmounts.fixedExchangeRate : paymentOrder.paymentOrderAmounts.exchangeRate;

    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = inputData.endowmentData.amountInContractCurrency;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = round(inputData.endowmentData.amountInContractCurrency * exchangeRate);
    paymentOrder.paymentOrderAmounts.originalTotalAmount = paymentOrder.paymentOrderAmounts.totalPaymentAmount;

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    const paymentLines = inputData.endowmentData.paymentLines;
    const investProfitLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfit);
    const investProfitAnnualLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitAnnual);
    const investProfitCouponLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitCoupon);
    const dividendsLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.dividends);

    const investProfitAmount = investProfitLine ? parseFloat(investProfitLine.lineAmountInContractCurrency) : 0;
    const investProfitAnnualAmount = investProfitAnnualLine ? parseFloat(investProfitAnnualLine.lineAmountInContractCurrency) : 0;
    const investProfitCouponAmount = investProfitCouponLine ? parseFloat(investProfitCouponLine.lineAmountInContractCurrency) : 0;
    const dividendsAmount = dividendsLine ? parseFloat(dividendsLine.lineAmountInContractCurrency) : 0;
    const investProfitTotalAmount = investProfitAmount + investProfitAnnualAmount + investProfitCouponAmount + dividendsAmount;
    const percentage = inputData.endowmentData.amountToPayPercentage ? parseFloat(inputData.endowmentData.amountToPayPercentage) : 0;

    paymentOrder.paymentOrderItems = [
        {
            itemType: paymentLineType.riskPayment,
            paymentOrderCurrencyAmount: inputData.endowmentData.amountInContractCurrency - round(investProfitTotalAmount * percentage),
            paymentCurrencyAmount: paymentOrder.paymentOrderAmounts.totalPaymentAmount - round(investProfitTotalAmount * exchangeRate * percentage)
        }
    ];

    if (investProfitTotalAmount > 0) {

        paymentOrder.paymentOrderItems.push(
            {
                itemType: paymentLineType.investProfit,
                paymentOrderCurrencyAmount: investProfitTotalAmount,
                paymentCurrencyAmount: round(investProfitTotalAmount * exchangeRate)
            }
        );
    }

    const pitAmount = inputData.endowmentData.pitInRub;

    if (pitAmount > 0) {

        const convertedPitLine = {
            itemType: paymentLineType.PIT,
            paymentOrderCurrencyAmount: undefined,
            paymentCurrencyAmount: pitAmount
        };

        paymentOrder.paymentOrderItems.push(convertedPitLine);
    }

    const directorSignerData = inputData.directorSignerData;
    const deputyDirectorSignerData = inputData.directorDeputySignerData;
    let signerDataToSet = undefined;
    const amountToCheck = round(inputData.endowmentData.amountInContractCurrency * inputData.endowmentData.localExchangeRate);

    if ((useFixedExchangeRate ? paymentOrder.paymentOrderAmounts.totalPaymentAmount : amountToCheck) > 3000000 && deputyDirectorSignerData) {

        signerDataToSet = deputyDirectorSignerData;
    }
    else {

        signerDataToSet = directorSignerData;
    }

    paymentOrder.paymentOrderInformation.insuranceAct.signedOn = signerDataToSet.signedDateTime;
    paymentOrder.paymentOrderInformation.insuranceAct.signerFullName = signerDataToSet.signedBy;
    paymentOrder.paymentOrderInformation.insuranceAct.signerPartyCode = signerDataToSet.signedByCode;
    paymentOrder.paymentOrderInformation.insuranceAct.signerUsername = signerDataToSet.signedByUser;

    const descriptionCode = paymentOrder.recipientInformation.isNonResident ? paymentDescriptionCode.nonResident + ' ' : '';

    paymentOrder.paymentOrderInformation.paymentOrderSubType = paymentOrderSubType.Endowment;
    const description = `${descriptionCode}Страховая выплата Дожитие по акту ${inputData.insuranceActNumber} от ${printoutUtils.formatDatePrint(inputData.insuranceActDate)}. Договор ${inputData.endowmentData.contractNumber}. Сумма ${paymentOrder.paymentOrderAmounts.totalPaymentAmount} Без налога (НДС).`;

    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

function setPITDataForPolicyEndowment(paymentOrder, inputData) {

    paymentOrder.paymentOrderInformation.contractNumber = inputData.endowmentData.contractNumber;
    paymentOrder.paymentOrderInformation.payerBankAccountNumber = inputData.endowmentData.policyCurrency === currency.localCurrency ? inputData.defaultBankAccountNo : undefined;
    paymentOrder.paymentOrderAmounts.paymentCurrencyCode = currency.localCurrency;

    paymentOrder.paymentOrderInformation.paymentOrderSubType = paymentOrderSubType.EndowmentPIT;
    paymentOrder.paymentOrderAmounts.paymentOrderCurrencyCode = currency.localCurrency;
    paymentOrder.paymentOrderAmounts.exchangeRate = 1;

    if (inputData.recipientPartyData) {

        paymentOrder.paymentOrderInformation.recipientNameFromBaseDocument = inputData.recipientPartyData.commonBody.fullName;
        paymentOrder.recipientInformation.partyCodeName = inputData.recipientPartyData.partyCode;
        paymentOrder.recipientInformation.partyType = inputData.recipientPartyData.partyType;
        paymentOrder.recipientInformation.partyFullName = inputData.recipientPartyData.commonBody.fullName;
        const inn = getValue(inputData, 'recipientPartyData.body.partyGeneralData.INNKIO');
        const kpp = getValue(inputData, 'recipientPartyData.body.partyOrganisationData.KPP');
        paymentOrder.recipientInformation.innNumber = inn;
        paymentOrder.recipientInformation.kppNumber = kpp;
    }

    let recipientBankAccounts = getValue(inputData, 'recipientPartyData.body.partyBankAccounts', []);
    recipientBankAccounts = recipientBankAccounts.filter(acc => !acc.closingDate);
    const recipientBankAccount = recipientBankAccounts.find(account => account.currency.currencyCode === currency.localCurrency);

    if (recipientBankAccount) {

        paymentOrder.recipientInformation.bankAccount = {};
        paymentOrder.recipientInformation.bankAccount.bankAccountNumber = recipientBankAccount.number;
        paymentOrder.recipientInformation.bankAccount.bankBIC = recipientBankAccount.bankBic;
        paymentOrder.recipientInformation.bankAccount.correspondentBankAccount = recipientBankAccount.bankCorrespondentAccount;
        paymentOrder.recipientInformation.bankAccount.bankAccountCurrency = recipientBankAccount.currency.currencyCode;
        paymentOrder.recipientInformation.bankAccount.bankName = recipientBankAccount.bankName;
    }

    const pitAmount = inputData.endowmentData.pitInRub ?? 0;
    paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = 0;
    paymentOrder.paymentOrderAmounts.totalPaymentAmount = 0;
    paymentOrder.paymentOrderAmounts.originalTotalAmount = 0;

    if (pitAmount > 0) {

        const convertedPitLine = {
            itemType: paymentLineType.PIT,
            paymentOrderCurrencyAmount: pitAmount,
            paymentCurrencyAmount: pitAmount
        };

        paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency = pitAmount;
        paymentOrder.paymentOrderAmounts.totalPaymentAmount = pitAmount;
        paymentOrder.paymentOrderItems = [];
        paymentOrder.paymentOrderItems.push(convertedPitLine);
    }

    const month = dateHelper.getMonth(paymentOrder.paymentOrderInformation.paymentOrderDate);
    const year = dateHelper.getYear(paymentOrder.paymentOrderInformation.paymentOrderDate);

    const description = `Перечисляется НДФЛ за ${monthStringName[month]} ${year} г. без налога НДС.`;
    paymentOrder.paymentOrderAmounts.paymentDescription = description;
}

module.exports = {
    setCommonPaymentOrderData,
    setDataForPaymentRefund,
    setDataForPolicyCancellation,
    setPITDataForPolicyCancellation,
    setDataForCommission,
    setDataForClaim,
    setPITDataForPolicyEndowment,
    setDataForEndowment,
    setDataForCollectiveClaim
};
