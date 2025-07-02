const { contractType, quoteState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { amendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    onTransitionAccumulatedLifeInsurance: function (input, that, result) {

        const documentContractType = input.documentConfiguration.dimensions.contractType;

        switch (documentContractType) {
            case contractType.Quote: {
                this.onTransitionAccumulatedLifeInsuranceQuote(input, that, result);
                break;
            }
            case contractType.Policy: {
                // for now the same functions
                this.onTransitionAccumulatedLifeInsuranceQuote(input, that, result);
                break;
            }
            case contractType.Amendment: {
                // for now the same functions
                this.onTransitionAccumulatedLifeInsuranceAmendment(input, that, result);
                break;
            }
            default:
                break;
        }

        return result;

    },

    onTransitionCreditLifeInsurance: function (input, that, result) {

        const documentContractType = input.documentConfiguration.dimensions.contractType;

        switch (documentContractType) {
            case contractType.Quote: {
                result = this.onTransitionAccumulatedLifeInsuranceQuote(input, that, result);
                break;
            }
            case contractType.Policy: {
                // for now the same functions
                this.onTransitionAccumulatedLifeInsuranceQuote(input, that, result);
                break;
            }
            case contractType.Amendment: {
                // for now the same functions
                result = this.onTransitionAccumulatedLifeInsuranceAmendment(input, that, result);
                break;
            }
            default:
                break;
        }

        return result;

    },

    onTransitionAccumulatedLifeInsuranceQuote: function (input, that, result) {

        result.attributes = { ...getValue(input, 'commonBody.transitionResult.attributes', {}), ...result.attributes };

        const username = getValue(that, 'applicationContext.originatingUser.username');
        const documentState = getValue(that, 'businessContext.documentState');
        const isCreatedByOperations = getValue(input, 'commonBody.attributes.isCreatedByOperations');
        const technicalInformation = getValue(input, 'body.technicalInformation', {});
        const transitionName = getValue(input, 'transitionName');
        const transitionNameOperations = transitionName.indexOf('Operations') > -1;
        const productCode = getValue(input, 'body.mainInsuranceConditions.insuranceProduct.productCode');

        switch (documentState) {
            case quoteState.Draft: {
                if (isCreatedByOperations) { result.attributes.operationsUsername = username; }
                // else result.attributes.sellerUsername = username;
                else if (!transitionNameOperations) { result.attributes.sellerUsername = username; }
                result.attributes.lastCommentId = technicalInformation.lastCommentId;
                break;
            }
            case quoteState.InfoRequest: {
                if (isCreatedByOperations) { result.attributes.operationsUsername = username; }
                else { result.attributes.sellerUsername = username; }
                result.attributes.lastCommentId = technicalInformation.lastCommentId;
                break;
            }
            case quoteState.OnReview: {
                result.attributes.UKSPUsername = username;
                result.attributes.lastCommentId = technicalInformation.lastCommentId;
                break;
            }
            case quoteState.Approved: {
                if (isNoteProduct(productCode)) {
                    result.attributes.operationsUsername = username;
                }
                else {
                    if (isCreatedByOperations) { result.attributes.operationsUsername = username; }
                    else { result.attributes.sellerUsername = username; }
                }
                break;
            }
            case quoteState.Rejected: {
                if (isCreatedByOperations) { result.attributes.operationsUsername = username; }
                else { result.attributes.sellerUsername = username; }
                break;
            }
            case quoteState.Active: {
                result.attributes.wasActive = true;
                if (isCreatedByOperations) { result.attributes.operationsUsername = username; }
                else { result.attributes.sellerUsername = username; }
                break;
            }

        }
    },

    onTransitionAccumulatedLifeInsuranceAmendment: function (input, that, result) {

        result.attributes = { ...getValue(input, 'commonBody.transitionResult.attributes', {}), ...result.attributes };

        const username = getValue(that, 'applicationContext.originatingUser.username');
        const documentState = getValue(that, 'businessContext.documentState');

        switch (documentState) {
            case amendmentState.OperationsApproval: {

                if (input.transitionName !== '$Create') {

                    result.attributes.lastOperationsUsername = username;
                }

                break;
            }
            case amendmentState.RequestToClient: {
                result.attributes.lastUKSPUsername = username;
                break;
            }
            case amendmentState.OperationsDirectorApproval: {
                result.attributes.lastOperationsDirectorUsername = username;
                break;
            }
        }
    }
};
