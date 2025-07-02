'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function filterAmendmentReason(input, ambientProperties) {

    const currentItems = input.items;
    const amendmentSubType = input.componentContext.amendmentSubType;
    const amendmentReason = input.componentContext.amendmentReason;
    const applicationSignDate = input.componentContext.applicationSignDate;
    const actualCoolOffDate = input.componentContext.policyData.actualCoolOffDate;

    if (!amendmentSubType) {

        return [];
    }

    const availableItems = JSON.parse(JSON.stringify(amendmentConstants.amendmentReasonBySubType[amendmentSubType]));

    if (amendmentSubType === amendmentConstants.amendmentSubType.byClientDecision) {

        if (input.rootContext.ConfigurationCodeName !== 'CreditLifeInsuranceCancellation') {

            availableItems.splice(availableItems.indexOf(amendmentConstants.amendmentReason.creditRepayment), 1);
        }

        if (applicationSignDate <= actualCoolOffDate) {

            if (amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff) {

                input.data.amendmentReason = undefined;
            }

            availableItems.splice(availableItems.indexOf(amendmentConstants.amendmentReason.byClientNonCoolOff), 1);
        }
        else if (applicationSignDate > actualCoolOffDate) {

            if (amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff) {

                input.data.amendmentReason = undefined;
            }

            availableItems.splice(availableItems.indexOf(amendmentConstants.amendmentReason.byClientCoolOff), 1);
        }
        else if (actualCoolOffDate) {

            if (amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff ||
                amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff) {

                input.data.amendmentReason = undefined;
            }

            availableItems.splice(availableItems.indexOf(amendmentConstants.amendmentReason.byClientCoolOff), 1);
            availableItems.splice(availableItems.indexOf(amendmentConstants.amendmentReason.byClientNonCoolOff), 1);
        }
    }

    const filteredItems = currentItems.filter(item => availableItems.includes(item));
    const currentAmendmentReason = input.data.amendmentReason;

    if ((amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff ||
        amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff) &&
        actualCoolOffDate &&
        !filteredItems.includes(currentAmendmentReason)) {

        input.data.amendmentReason = undefined;
    }

    return filteredItems;
};


