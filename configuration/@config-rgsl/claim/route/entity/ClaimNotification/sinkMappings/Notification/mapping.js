'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(lineInput, sinkExchange) {

    const entityType = lineInput.entityType;
    const claimNumber = lineInput.number;
    const clientBaseUrl = this.environmentVariables.clientBaseUrl;
    const claimUri = clientBaseUrl + '/' + uriBuilder.getClaimUri(claimNumber);

    const state = lineInput.state;
    let recipientsArray = [];
    let group = '';
    const isLegalApprovalGroup = state == claimStates.legalApproval;

    if (isLegalApprovalGroup) {

        recipientsArray = this.environmentVariables["rgsl.groupEmails.claimLegalGroup"]?.split(';').map(item => item.toLowerCase()) ?? [];
        group = 'Юристы';
    }

    const isSecurityApprovalGroup = state == claimStates.securityApproval;

    if (isSecurityApprovalGroup) {

        recipientsArray = this.environmentVariables["rgsl.groupEmails.claimSecurityGroup"]?.split(';').map(item => item.toLowerCase()) ?? [];
        group = 'Безопасность';
    }

    const isMethodologyDirectorApproval = state == claimStates.methodologyDirectorApproval;

    if (isMethodologyDirectorApproval) {

        recipientsArray = this.environmentVariables["rgsl.groupEmails.claimMethodologyDirector"]?.split(';').map(item => item.toLowerCase()) ?? [];
        group = 'Директор по методологии';
    }

    const output = {
        entityType: entityType,
        dataContext: {
            content: {
                claimNumber: claimNumber,
                claimUri: claimUri,
                group: group
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };

    return output;
};
