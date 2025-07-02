'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function claimMapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}) {

    const typeOfRequest = getValue(body, 'typeOfRequest');
    const amendmentReason = getValue(body, 'amendmentReason');
    const receiveMethod = getValue(body, 'receiveMethod');
    const coolOffPeriodEnd = getValue(body, 'coolOffPeriodEndSyncWithCalendar');
    const issueDate = getValue(body, 'issueDate');
    const receivedDate = getValue(body, 'receivedDate');
    const registrationDate = getValue(body, 'registrationDate');
    const initiator = getValue(body, 'initiator');
    const applicantCode = getValue(body, 'applicant.partyData.partyCode');
    const applicantFullName = getValue(body, 'applicant.partyData.partyFullName');
    const holderCode = getValue(body, 'holder.partyCode');
    const holderFullName = getValue(body, 'holder.fullName');
    const returnForRevisionReason = getValue(body, 'returnForRevisionReason');
    const sellerUsername = getValue(body, 'sellerUsername');
    const bankBic = getValue(body, 'bankAccount.bankBic');
    const bankCorrespondentAccount = getValue(body, 'bankAccount.bankCorrespondentAccount');
    const bankId = getValue(body, 'bankAccount.bankId');
    const bankInn = getValue(body, 'bankAccount.bankInn');
    const bankName = getValue(body, 'bankAccount.bankName');
    const bankCurrencyCode = getValue(body, 'bankAccount.currencyCode');
    const bankCurrencyDesc = getValue(body, 'bankAccount.currencyDesc');
    const bankCurrencyNumericCode = getValue(body, 'bankAccount.currencyNumericCode');
    const bankDisplayName = getValue(body, 'bankAccount.displayName');
    const bankNumber = getValue(body, 'bankAccount.number');
    const changeTypes = getValue(body, 'changeType');
    const changeSubtypes = getValue(body, 'changeSubtype');
    const changeClasses = getValue(body, 'changeClass');
    const isCancellation = typeOfRequest == 'Cancellation';
    const isByClientCoolOff = amendmentReason == 'byClientCoolOff';
    const contractNumber = getValue(body, 'contract.number');
    const contractHolderFullName = getValue(body, 'holder.fullName');
    const contractConfigurationName = getValue(body, 'contract.configurationName');

    const result = {

        'UNI_IMPL.RQT_HUB': [{
            REQUEST_NUMBER: number
        }],

        'UNI_IMPL.RQT_SAT': [{
            REQUEST_NUMBER: number,
            REQUEST_STATE: state,
            TYPE_OF_REQUEST: typeOfRequest,
            RECIEVE_METHOD: receiveMethod,
            AMENDMENT_REASON: isCancellation ? amendmentReason : null,
            INITIATOR: initiator,
            ISSUE_DATE: issueDate,
            RECIEVE_DATE: receivedDate,
            REGISTRATION_DATE: registrationDate,
            COOL_OFF_PERIOD_END: isByClientCoolOff ? coolOffPeriodEnd : null,
            APPLICANT_CODE: applicantCode,
            APPLICANT_FULL_NAME: applicantFullName,
            HOLDER_CODE: holderCode,
            RETURN_REASON: returnForRevisionReason,
            SELLER_USERNAME: sellerUsername,
            BANK_BIC: bankBic,
            BANK_CORR_ACC: bankCorrespondentAccount,
            BANK_ID: bankId,
            BANK_INN: bankInn,
            BANK_NAME: bankName,
            BANK_CURR_CODE: bankCurrencyCode,
            BANK_CURR_DESC: bankCurrencyDesc,
            BANK_CURR_NUM_CODE: bankCurrencyNumericCode,
            BANK_DISPLAY_NAME: bankDisplayName,
            BANK_NUMBER: bankNumber,
            CONTRACT_NUMBER: contractNumber,
            CONTRACT_HOLDER_NAME: contractHolderFullName,
            CONTRACT_CONF_CODE_NAME: contractConfigurationName,
        }],

        'UNI_IMPL.RQT_CONTRACT_LINK': contractNumber ? [
            {
                REQUEST_NUMBER: number,
                CONTRACT_NUMBER: contractNumber
            }
        ] : [],

        'UNI_IMPL.RQT_APPLICANT_LINK': applicantCode ? [
            {
                REQUEST_NUMBER: number,
                PARTY_CODE: applicantCode
            }
        ] : [],

        'UNI_IMPL.RQT_HOLDER_LINK': holderCode ? [
            {
                REQUEST_NUMBER: number,
                PARTY_CODE: holderCode
            }
        ] : [],

        'UNI_IMPL.RQT_CHANGE_TYPE_SAT': [],
        'UNI_IMPL.RQT_CHANGE_SUB_TYPE_SAT': [],
        'UNI_IMPL.RQT_CHANGE_CLASS_SAT': [],

    };

    if (changeTypes && changeTypes.length > 0) {

        changeTypes.forEach(changeType => {

            result['UNI_IMPL.RQT_CHANGE_TYPE_SAT'].push({
                REQUEST_NUMBER: number,
                CODE: changeType
            });
        });

    }

    if (changeSubtypes && changeSubtypes.length > 0) {

        changeSubtypes.forEach(changeSubtype => {

            result['UNI_IMPL.RQT_CHANGE_SUB_TYPE_SAT'].push({
                REQUEST_NUMBER: number,
                CODE: changeSubtype
            });
        });

    }

    if (changeClasses && changeClasses.length > 0) {

        changeClasses.forEach(changeClass => {

            result['UNI_IMPL.RQT_CHANGE_CLASS_SAT'].push({
                REQUEST_NUMBER: number,
                CODE: changeClass
            });
        });

    }

    return result;

};
