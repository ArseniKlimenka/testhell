'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    generateContext: function (input, self) {

        const requestConfigurationCodeName = getValue(self, 'businessContext.configurationCodeName');
        const issueDate = getValue(input, 'issueDate');
        const typeOfRequest = getValue(input, 'typeOfRequest');
        const amendmentReason = getValue(input, 'amendmentReason');

        const allObjects = [];
        const allItems = [];

        // holder
        const holderFullName = getValue(input, 'holder.fullName');
        const holderPartyCode = getValue(input, 'holder.partyCode');

        // applicant
        const applicantFullName = getValue(input, 'applicant.partyData.partyFullName');
        const applicantPartyCode = getValue(input, 'applicant.partyData.partyCode');

        // contract
        const contractNumber = getValue(input, 'contract.number');
        const contractStateCode = getValue(input, 'contract.stateCode');
        const contractConfigurationName = getValue(input, 'contract.configurationName');
        const contractPartnerBusinessCode = getValue(input, 'contract.partnerBusinessCode');
        const contractPercentRateImpact = getValue(input, 'contract.percentRateImpact');
        const contractProductCode = getValue(input, 'contract.productCode');
        const contractProductGroup = getValue(input, 'contract.productGroup');
        const contractIssueDate = getValue(input, 'contract.issueDate');
        const contractStartDate = getValue(input, 'contract.startDate');
        const contractEndDate = getValue(input, 'contract.endDate');
        const contractPartner = getValue(input, 'contract.partner', {});

        // amount
        const amountWithAllRisks = getValue(input, 'amountWithAllRisks');

        // bank account
        const bankId = getValue(input, 'bankAccount.bankId');
        const bankName = getValue(input, 'bankAccount.bankName');
        const bankBic = getValue(input, 'bankAccount.bankBic');
        const bankCorrespondentAccount = getValue(input, 'bankAccount.bankCorrespondentAccount');
        const currencyCode = getValue(input, 'bankAccount.currencyCode');
        const currencyDesc = getValue(input, 'bankAccount.currencyDesc');
        const currencyNumericCode = getValue(input, 'bankAccount.currencyNumericCode');
        const number = getValue(input, 'bankAccount.number');
        const openingDate = getValue(input, 'bankAccount.openingDate');
        const closingDate = getValue(input, 'bankAccount.closingDate');
        const bankInn = getValue(input, 'bankAccount.bankInn');
        const displayName = getValue(input, 'bankAccount.displayName');

        return {
            requestConfigurationCodeName,
            issueDate,
            typeOfRequest,
            amendmentReason,
            holderFullName,
            holderPartyCode,
            applicantFullName,
            applicantPartyCode,
            contractNumber,
            contractStateCode,
            contractConfigurationName,
            contractPartnerBusinessCode,
            contractPercentRateImpact,
            contractProductCode,
            contractProductGroup,
            contractIssueDate,
            contractStartDate,
            contractEndDate,
            contractPartner,
            amountWithAllRisks,
            bankId,
            bankName,
            bankBic,
            bankCorrespondentAccount,
            currencyCode,
            currencyDesc,
            currencyNumericCode,
            number,
            openingDate,
            closingDate,
            bankInn,
            displayName,
            allObjects,
            allItems
        };
    },

    generateCommonBody: function (input, self) {

        const context = this.generateContext(input, self);

        const commonBody = {
            productCode: "LifeInsuranceRequest",
            request: {
                configurationCodeName: context.requestConfigurationCodeName,
                issueDate: context.issueDate,
                typeOfRequest: context.typeOfRequest,
                amendmentReason: context.amendmentReason,
            },
            contract: {
                number: context.contractNumber,
                stateCode: context.contractStateCode,
                configurationName: context.contractConfigurationName,
                partnerBusinessCode: context.contractPartnerBusinessCode,
                percentRateImpact: context.contractPercentRateImpact,
                productCode: context.contractProductCode,
                productGroup: context.contractProductGroup,
                issueDate: context.contractIssueDate,
                startDate: context.contractStartDate,
                endDate: context.contractEndDate,
                partner: context.contractPartner
            },
            amountWithAllRisks: context.amountWithAllRisks,
            holder: {
                fullName: context.holderFullName,
                partyCode: context.holderPartyCode
            },
            applicant: {
                fullName: context.applicantFullName,
                partyCode: context.applicantPartyCode
            },
            bankAccount: {
                bankId: context.bankId,
                bankName: context.bankName,
                bankBic: context.bankBic,
                bankCorrespondentAccount: context.bankCorrespondentAccount,
                currencyCode: context.currencyCode,
                currencyDesc: context.currencyDesc,
                currencyNumericCode: context.currencyNumericCode,
                number: context.number,
                openingDate: context.openingDate,
                closingDate: context.closingDate,
                bankInn: context.bankInn,
                displayName: context.displayName
            },
            objects: context.allObjects,
            items: context.allItems

        };

        return commonBody;
    }

};
