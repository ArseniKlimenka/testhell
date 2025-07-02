"use strict";

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { getChangeClassElementsBySubtype, getChangeSubtypeByChangeClass } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { documentActions, documentTransitions } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { changeTypes, investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

function createLifeAmendmentCancellationMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    if (context.contractData.configurationName != contractConfigurationName) {

        return;
    }

    const stateBody = (context.latestContractData.seqNumber == 0 ? context.latestContractData.body : context.latestContractData.snapshotBody)
        ?? context.latestContractData.body;

    const policyHolder = stateBody.policyHolder;
    const defaultCancellationBody = amendmentUtils.getDefaultCancellationBody(context.request.this, policyHolder);
    const request = context.request;

    const validFrom = context.request.issueDate;

    defaultCancellationBody.technicalInformation.isCreatedByOperations = true;
    defaultCancellationBody.technicalInformation.originalDocumentId = context.contractData.contractId;
    defaultCancellationBody.contractVersions = context.contractVersions;
    defaultCancellationBody.allocationsInfo = context.allocations;

    defaultCancellationBody.basicAmendmentConditions = {
        receiveMethod: context.request.receiveMethod,
        applicationSignDate: context.request.issueDate,
        applicationReceiveDate: context.request.receivedDate,
        validFrom: validFrom,
        fullPackageReceiveDate: context.onReviewRequestLastDate,
        applicant: {
            partyCode: request.applicant.partyCode,
            partyType: request.applicant.partyType,
            fullName: request.applicant.partyFullName
        }
    };

    defaultCancellationBody.basicAmendmentConditions.amendmentReason = context.request.amendmentReason;

    defaultCancellationBody.technicalData = {
        policyParties: {
            holder: {
                personCode: context.foundHolderData[0].code,
                fullName: context.foundHolderData[0].fullName
            }
        }
    };

    if (context.request.amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff ||
        context.request.amendmentReason === amendmentConstants.amendmentReason.creditRepayment ||
        context.request.amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff) {

        defaultCancellationBody.basicAmendmentConditions.amendmentSubType = amendmentConstants.amendmentSubType.byClientDecision;
    }

    defaultCancellationBody.paymentAmendmentConditions.exchangeRate = context.exchangeRate;
    amendmentUtils.setCancellationPaymentLines(defaultCancellationBody, stateBody);

    if (input.body.paymentCalculation?.paymentLines?.length > 0
        && contractConfigurationName === lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy) {
        defaultCancellationBody.paymentCalculation = input.body.paymentCalculation;
        const taxPaymentLine = defaultCancellationBody.paymentCalculation.paymentLines.find(l => l.paymentLineType === 'Tax');
        if (taxPaymentLine) {
            taxPaymentLine.paymentLineSum = 0;
        }
    }

    const result = {
        businessNumber: context.contractData.contractNumber,
        body: defaultCancellationBody
    };

    return result;
}

function updateLifeAmendmentCancellationMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    if (context.contractData.configurationName != contractConfigurationName) {

        return;
    }

    const amendmentBody = context.createdAmendmentBody;

    if (context.totalAmount > 0) {

        setAmountRelatedData(context, amendmentBody);
    }

    if (context.createdAmendmentNumber && context.createdAmendmentBody) {

        amendmentBody.technicalInformation.requestId = context?.request?.id;
        amendmentBody.technicalInformation.requestNumber = context?.request?.number;
        amendmentBody.technicalInformation.requestAmendmentReason = context?.request?.amendmentReason;
        amendmentBody.technicalInformation.requestState = context?.request?.state;

        const result = {
            body: amendmentBody,
            number: context.createdAmendmentNumber
        };

        return result;
    }
}

function setAmountRelatedData(context, cancellationBody) {

    const holder = context.partyData;
    const request = context.request;
    const predefinedBankAccount = request.bankAccount;
    let existigBankAccount = holder.bankAccounts.find(account => account.number === predefinedBankAccount.number);

    if (!existigBankAccount) {

        existigBankAccount = holder.bankAccounts.find(account => account.currency.currencyCode === currency.localCurrency) ?? holder.bankAccounts[0];
    }

    cancellationBody.paymentAmendmentConditions.canellationRecipients = [
        {
            partyId: holder.partyId,
            partyCode: holder.partyCode,
            partyType: holder.partyType,
            fullName: holder.partyFullName,
            recipientReason: amendmentConstants.defaultCancellationRecipientReason,
            recipientPaymentType: amendmentConstants.defaultCancellationRecipientPaymentType,
            amountToPayPercetage: 1,
            bankAccount: existigBankAccount ?
                {
                    bankId: existigBankAccount.bankId,
                    bankName: existigBankAccount.bankName,
                    bankBic: existigBankAccount.bankBic,
                    bankCorrespondentAccount: existigBankAccount.bankCorrespondentAccount,
                    SWIFT: existigBankAccount.SWIFT,
                    IBAN: existigBankAccount.IBAN,
                    foreignBank: existigBankAccount.foreignBank,
                    currency: existigBankAccount.currency,
                    number: existigBankAccount.number,
                    openingDate: existigBankAccount.openingDate,
                    closingDate: existigBankAccount.closingDate,
                    bankInn: existigBankAccount.bankInn,
                } : undefined
        }
    ];
}

function createLifeFinancialChangeAmendmentMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    if (context.contractData.configurationName != contractConfigurationName) {
        return;
    }

    const result = {
        businessNumber: context.contractData.contractNumber,
        body: context.contractData.body
    };

    return result;

}

function createChangeAmendmentMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    if (context.contractData.configurationName != contractConfigurationName) {
        return;
    }

    const stateBody = (context.latestContractData.seqNumber == 0 ? context.latestContractData.body : context.latestContractData.snapshotBody)
        ?? context.latestContractData.body;

    const elementsBySubtype = getChangeClassElementsBySubtype(input);
    const requestLastAmendment = checkLastAmendmentToCreate(input);
    const isPolicyHolder = stateBody.insuredPerson.isPolicyHolder;
    let currentChangeTypes;

    if (context.requestTransition == documentActions.CreateNonFinancialAmendment) {

        currentChangeTypes = elementsBySubtype.nonFinChangeElements || [];
    }

    if (context.requestTransition == documentActions.CreateFinancialAmendment) {

        currentChangeTypes = elementsBySubtype.finChangeElements || [];
    }

    if (context.requestTransition == documentActions.CreateFinancialPolicyHolderChangeAmendment) {

        currentChangeTypes = elementsBySubtype.policyHolderChangeElements || [];
    }

    if (isPolicyHolder && currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit) && !currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit)) {

        currentChangeTypes.push(changeTypes.insuredPersonPersonalDataEdit);
    }

    if (isPolicyHolder && currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) && !currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit)) {

        currentChangeTypes.push(changeTypes.policyHolderPersonalDataEdit);
    }

    const body = stateBody;
    const beneficiaries = stateBody.beneficiaries?.beneficiaries ?? [];
    const additionalBeneficiaries = stateBody.additionalBeneficiaries ?? [];

    const today = dateTimeUtils.newDateAsString(dateTimeUtils.DateFormats.ECMASCRIPT);

    body.amendmentData = {
        amendmentAttachmentsPackage: [],
        nonFinChangeAmendmentData: {
            mainAttributes: {
                changeTypes: currentChangeTypes,
                amendmentIssueDate: undefined,
                amendmentEffectiveDate: input.body.issueDate,
                initiator: input.body.initiator,
                changeReason: input.body.changeReason,
                personalDataChangeType: input.body.changeType
            },
            applicationInfo: {
                applicant: {
                    partyCode: input.body.applicant.partyData.partyCode,
                    partyType: input.body.applicant.partyData.partyType,
                    fullName: input.body.applicant.partyData.partyFullName
                },
                receiveMethod: input.body.receiveMethod,
                applicationDate: input.body.receivedDate ?? today,
                requestIssueDate: input.body.issueDate,
                registrationDate: input.body.registrationDate
            },
            amendmentInfo: {
                approvalRequests: {
                    insuranceMethodologyRequest: undefined,
                    actuaryRequest: undefined,
                    legalRequest: undefined,
                    securityRequest: undefined,
                    undrwriterRequest: undefined,
                    requestToClient: undefined
                },
                approvalConclusions: {},
                rejectionReason: undefined,
                changeMailSequence: context.changeMailSequence
            },
            technicalData: {
                requestData: {
                    number: input.number,
                    lastAmendment: requestLastAmendment,
                    transition: context.requestTransition,
                },
                beneficiaryData: {
                    added: [],
                    removed: [],
                    initial: beneficiaries.map(item => item.beneficiaryId)
                },
                additionalBeneficiaryData: {
                    added: [],
                    removed: [],
                    initial: additionalBeneficiaries.map(item => item.beneficiaryId)
                }
            }
        }
    };

    const changeClass = input.body.changeClass;
    const investmentParametersEditClassFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if (investmentParametersEditClassFilled) {
        const equityStrategies = input.body.equityStrategies;
        body.equityStrategies = equityStrategies;
        body.amendmentData.nonFinChangeAmendmentData.technicalData.areInvestmentParametersChanged = true;
    }

    const result = {
        businessNumber: context.contractData.contractNumber,
        body: body
    };

    return result;

}

function createFinChangeAmendmentMapping(input, context, contractConfigurationName) {
    if (context.contractData.configurationName != contractConfigurationName) {
        return;
    }

    const requestBody = input.body;
    const stateBody = (context.latestContractData.seqNumber == 0 ? context.latestContractData.body : context.latestContractData.snapshotBody)
        ?? context.latestContractData.body;
    const body = stateBody;

    const elementsBySubtype = getChangeClassElementsBySubtype(input);
    const requestLastAmendment = checkLastAmendmentToCreate(input);
    const currentChangeTypes = elementsBySubtype.finChangeElements || [];
    const today = dateTimeUtils.newDateAsString(dateTimeUtils.DateFormats.ECMASCRIPT);

    body.amendmentData = {
        amendmentAttachmentsPackage: [],
        finChangeAmendmentData: {
            mainAttributes: {
                changeTypes: currentChangeTypes,
                amendmentIssueDate: today,
                amendmentEffectiveDate: today,
                acceptDate: today,
                initiator: requestBody.initiator,
                changeReason: requestBody.changeReason
            },
            applicationInfo: {
                applicant: {
                    partyCode: requestBody.applicant.partyData.partyCode,
                    partyType: requestBody.applicant.partyData.partyType,
                    fullName: requestBody.applicant.partyData.partyFullName
                },
                receiveMethod: requestBody.receiveMethod,
                applicationDate: requestBody.receivedDate ?? today,
                requestIssueDate: requestBody.issueDate,
                documentsReceivedDate: context.receivedDate,
                registrationDate: requestBody.registrationDate
            },
            technicalData: {
                requestData: {
                    number: input.number,
                    lastAmendment: requestLastAmendment,
                    transition: context.requestTransition,
                },
                originalPolicyRisks: requestBody.risks ?? [],
                originalPolicyTerms: requestBody.policyTerms ?? {}
            },
            calculationDate: requestBody.receivedDate,
            equityDidPayment: requestBody.equityDidPayment
        }
    };

    if (!body.risksCorrection) {
        body.risksCorrection = {};
    }
    body.risksCorrection.manualCorrection = true;

    body.paymentPlan = [];
    body.surrenderValues = [];
    body.risks.forEach(r => {

        r.startDate = undefined;
        r.riskInsuredSumByPeriod = [];
        r.endDate = undefined;
    });

    const changeClass = input.body.changeClass;
    const investmentParametersEditClassFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if (investmentParametersEditClassFilled) {
        const equityStrategies = input.body.equityStrategies;
        body.equityStrategies = equityStrategies;
    }

    const result = {
        businessNumber: context.contractData.contractNumber,
        body: body
    };

    return result;
}

function updateRequestFromAmendmentMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    let result = null;

    const body = context?.requestData?.body;
    let requestBody;

    if (typeof body == 'object') {
        requestBody = body;
    } else if (typeof body == 'string') {
        requestBody = JSON.parse(body);
    }

    if (requestBody) {
        requestBody.technicalInformation.allAmendmentsCreated = context?.requestLastAmendment;

        const transition = input?.body?.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.transition;
        if (transition == documentActions.CreateNonFinancialAmendment) {
            requestBody.contract.createdNonFinAmendmentNumber = input.number;
        }
        if (transition == documentActions.CreateFinancialAmendment) {
            requestBody.contract.createdFinAmendmentNumber = input.number;
        }
        if (transition == documentActions.CreateFinancialPolicyHolderChangeAmendment) {
            requestBody.contract.createdPolicyHolderChangeAmendmentNumber = input.number;
        }

        result = {
            body: requestBody,
            number: context.requestNumber
        };
    }

    return result;

}

function checkLastAmendmentToCreate(input) {

    const techInf = input.body.technicalInformation;
    const amendmentsCreated = [techInf.nonFinAmendmentWasCreated, techInf.finAmendmentWasCreated, techInf.finPolicyHolderAmendmentWasCreated];
    const amendmentsCreatedCount = amendmentsCreated.filter(item => item).length;

    const subType = getChangeSubtypeByChangeClass(input);
    const amendmentsToCreate = [subType.isNonFinChange, subType.isFinChange, subType.isPolicyHolderChange];
    const amendmentsToCreateCount = amendmentsToCreate.filter(item => item).length;

    if (amendmentsToCreateCount == amendmentsCreatedCount + 1) {
        return true;
    }
    return false;

}

function getExistingRequestAttachmentsMapping(input) {

    if (input && input.body &&
        input.body.attachmentsPackage &&
        input.body.attachmentsPackage[0] &&
        input.body.attachmentsPackage[0].entityId) {

        const requestEntityId = input.body.attachmentsPackage[0].entityId;

        return {
            input: {
                data: {
                    criteria: {
                        entitiesIds: [requestEntityId]
                    }
                }
            }
        };

    }
    return null;


}

function getContractMapping(context) {

    if (context.contractNumber) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: context.contractNumber,
                        versionState: 'Applied'
                    }
                }
            }
        };

    }
    return null;


}

function setContractApply(context, sinkResult) {

    if (context && sinkResult && sinkResult.data && sinkResult.data.length > 0) {

        const contractVersionsMapped = sinkResult.data.map(data => data.resultData);
        const contractStateVersions = contractVersionsMapped.filter(i => i.seqNumber == 0 ||
            i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));
        const contractStateVersionsSorted = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber);
        const originalDocumentVersion = contractStateVersionsSorted.find(item => item.seqNumber == 0);
        const latestContractStateVersion = contractStateVersionsSorted[0];

        context.contractData = originalDocumentVersion;
        context.latestContractData = latestContractStateVersion;
        context.contractVersions = contractVersionsMapped;
    }
}


function getAmendmentMapping(context) {

    if (context && context.createdAmendmentNumber) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumberStrict: context.createdAmendmentNumber
                    }
                }
            }
        };

    }
    return null;


}

function setAmendmentApply(context, sinkResult) {

    if (context &&
        sinkResult &&
        sinkResult.data &&
        sinkResult.data[0] &&
        sinkResult.data[0].resultData &&
        sinkResult.data[0].resultData.contractId) {
        context.amendmentId = sinkResult.data[0].resultData.contractId;
    }

}

function setMainRequestContext(input, context, requestTransition, self) {

    context.contractNumber = input.body.contract.number;
    context.requestTransition = requestTransition;

    context.request = {
        this: self,
        id: input.id,
        number: input.number,
        state: input.state,
        amendmentReason: input.body.amendmentReason,
        issueDate: input.body.issueDate,
        receivedDate: input.body.receivedDate,
        attachmentsPackage: input.body.attachmentsPackage,
        holder: input.body.holder,
        bankAccount: input.body.bankAccount,
        typeOfRequest: input.body.typeOfRequest,
        applicant: input.body.applicant,
        receiveMethod: input.body.receiveMethod
    };
}

function setCreatedAmendmentContext(context, sinkResult) {

    if (context && sinkResult) {
        context.createdAmendmentNumber = sinkResult.number;
        context.createdAmendmentConfigurationCodeName = sinkResult.configurationCodeName;
        context.createdAmendmentBody = sinkResult.body;
    }
}

function copyAttachmentsMapping(input, context) {

    return {
        amendmentId: context.amendmentId,
        requestAttachmentsWithFileId: context.requestAttachmentsWithFileId
    };
}

function requestToCreateAmendmentMapping(input, context) {

    return {
        businessNumber: input.number,
        transition: {
            transitionName: documentTransitions.CreateNonFinancialAmendment_to_CreateAmendment,
            configurationName: input.configurationCodeName,
            configurationVersion: input.configurationVersion
        }
    };
}

function requestOnReviewToCreateAmendmentMapping(input, context) {

    const changeClass = input.body.changeClass;
    const investmentParametersEditClassFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if (investmentParametersEditClassFilled) {

        return {
            businessNumber: input.number,
            transition: {
                transitionName: documentTransitions.OnReview_to_CreateAmendment,
                configurationName: input.configurationCodeName,
                configurationVersion: input.configurationVersion
            }
        };

    }

    return;

}

function requestCreateAmendmentToCreateNonFinancialAmendmentMapping(input, context) {

    const changeClass = input.body.changeClass;
    const investmentParametersEditClassFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if (investmentParametersEditClassFilled) {

        return {
            businessNumber: input.number,
            transition: {
                transitionName: documentTransitions.CreateAmendment_to_CreateNonFinancialAmendment,
                configurationName: input.configurationCodeName,
                configurationVersion: input.configurationVersion
            }
        };

    }

    return;

}

function createAutoConversionAmendmentMapping(input, context, additionalDataSourcesData, contractConfigurationName) {

    if (context.contractData.configurationName != contractConfigurationName) {
        return;
    }

    const contractDataBody = context.contractData.body;
    const amendmentEffectiveDate = dateTimeUtils.formatDate(input.unpaidPeriodDate);

    if (contractDataBody.risksCorrection?.manualCorrection) {
        contractDataBody.risksCorrection.manualCorrection = true;
    }

    contractDataBody.isAutoconversionAmendment = true;
    contractDataBody.risks.forEach(r => {
        r.startDate = amendmentEffectiveDate;
        r.riskPremium = 0;
    });

    contractDataBody.amendmentData = {
        finChangeAmendmentData: {
            mainAttributes: {
                amendmentEffectiveDate: amendmentEffectiveDate,
                amendmentIssueDate: amendmentEffectiveDate,
                acceptDate: amendmentEffectiveDate,
                changeTypes: [
                    changeTypes.allowPaymentStateChange,
                    changeTypes.insuredSumAndPaymentEdit
                ]
            },
            applicationInfo: {
                applicant: {
                    partyCode: contractDataBody.policyHolder.partyData.partyCode,
                    partyType: contractDataBody.policyHolder.partyData.partyType,
                    fullName: contractDataBody.policyHolder.partyData.partyFullName
                },
                receiveMethod: amendmentConstants.receiveMethod.email,
                applicationDate: amendmentEffectiveDate,
                requestIssueDate: amendmentEffectiveDate,
                documentsReceivedDate: amendmentEffectiveDate,
                registrationDate: amendmentEffectiveDate
            },
            amendmentInfo: {
                approvalRequests: {
                    insuranceMethodologyRequest: undefined,
                    actuaryRequest: undefined,
                    legalRequest: undefined,
                    securityRequest: undefined,
                    undrwriterRequest: undefined,
                    requestToClient: undefined
                },
                approvalConclusions: {},
                rejectionReason: undefined
            }
        }
    };

    return {
        businessNumber: input.contractNumber,
        body: contractDataBody
    };
}

module.exports = {
    createLifeAmendmentCancellationMapping,
    updateLifeAmendmentCancellationMapping,
    createLifeFinancialChangeAmendmentMapping,
    createChangeAmendmentMapping,
    updateRequestFromAmendmentMapping,
    getExistingRequestAttachmentsMapping,
    setAmendmentApply,
    getContractMapping,
    setContractApply,
    getAmendmentMapping,
    setMainRequestContext,
    setCreatedAmendmentContext,
    copyAttachmentsMapping,
    requestToCreateAmendmentMapping,
    requestOnReviewToCreateAmendmentMapping,
    requestCreateAmendmentToCreateNonFinancialAmendmentMapping,
    setAmountRelatedData,
    createAutoConversionAmendmentMapping,
    createFinChangeAmendmentMapping
};
