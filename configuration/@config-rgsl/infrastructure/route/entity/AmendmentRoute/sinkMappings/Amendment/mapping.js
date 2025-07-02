const { getAmendmentSat,
    getAmendmentLinesSat,
    getNonFinChangeCommonAmendmentSat,
    getNonFinChangeAmendmentSat,
    setCancellationRecipientData } = require('@config-rgsl/infrastructure/lib/SinkMappingHelperContract');

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping({
    number,
    state,
    body,
    originalDocumentNumber,
    dimensions
}, sinkExchange) {

    const result = {
        'PAS_IMPL.AMENDMENT_HUB': [{
            AMENDMENT_NUMBER: number
        }],

        'PAS_IMPL.POLICY_AMENDMENT_LINK': [{
            CONTRACT_NUMBER: originalDocumentNumber,
            AMENDMENT_NUMBER: number
        }]
    };

    if (dimensions.amendmentType === 'NonFinancialChange') {

        setNonFinChangeAmendmentSatellites(result, body, number, originalDocumentNumber, dimensions, state);
    }
    else if (dimensions.amendmentType === 'Cancellation') {

        setCancellationAmendmentSatellites(result, state, body, number, dimensions);
    }
    else if (dimensions.amendmentType === 'Technical') {

        setTechnicalAmendmentSatellites(result, body, number, originalDocumentNumber, dimensions, state);
    }
    else {

        result['PAS_IMPL.AMENDMENT_SAT'] = getAmendmentSat({
            number,
            body,
            dimensions,
            state
        });
    }

    return result;
};

function setNonFinChangeAmendmentSatellites(result, body, number, originalDocumentNumber, dimensions, state) {

    result['PAS_IMPL.AMENDMENT_SAT'] = getNonFinChangeCommonAmendmentSat({
        number,
        body,
        dimensions,
        state
    });

    result['PAS_IMPL.CHANGE_AMENDMENT_SAT'] = getNonFinChangeAmendmentSat({
        number,
        body
    });

    result['PAS_IMPL.CHANGE_APPLICANT_SAT'] = [
        {
            $deleted: true,
            AMENDMENT_NUMBER: number
        }
    ];

    const applicant = getValue(body, 'amendmentData.nonFinChangeAmendmentData.applicationInfo.applicant');

    if (applicant) {

        result['PAS_IMPL.CHANGE_APPLICANT_LINK'] = [
            {
                AMENDMENT_NUMBER: number,
                PARTY_CODE: applicant.partyCode
            }
        ];

        result['PAS_IMPL.CHANGE_APPLICANT_SAT'].push(
            {
                AMENDMENT_NUMBER: number,
                PARTY_CODE: applicant.partyCode,
                RECEIVE_METHOD: getValue(body, 'amendmentData.nonFinChangeAmendmentData.applicationInfo.receiveMethod'),
                APPLICATION_DATE: getValue(body, 'amendmentData.nonFinChangeAmendmentData.applicationInfo.applicationDate'),
                REGISTRATION_DATE: getValue(body, 'amendmentData.nonFinChangeAmendmentData.applicationInfo.registrationDate'),
                REQUEST_ISSUE_DATE: getValue(body, 'amendmentData.nonFinChangeAmendmentData.applicationInfo.requestIssueDate')
            }
        );
    }

    const personalDataChangeType = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.personalDataChangeType', []);

    result['PAS_IMPL.PERS_DATA_CHANGE_SAT'] = [
        {
            $deleted: true,
            AMENDMENT_NUMBER: number
        }
    ];

    personalDataChangeType.map(persChangeType => {

        result['PAS_IMPL.PERS_DATA_CHANGE_SAT'].push({
            AMENDMENT_NUMBER: number,
            PERS_DATA_CHANGE_TYPE: persChangeType
        });
    });

    const changeTypes = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.changeTypes', []);

    result['PAS_IMPL.CHANGE_TYPE_SAT'] = [
        {
            $deleted: true,
            AMENDMENT_NUMBER: number
        }
    ];

    changeTypes.map(changeType => {

        result['PAS_IMPL.CHANGE_TYPE_SAT'].push({
            AMENDMENT_NUMBER: number,
            CHANGE_TYPE: changeType
        });
    });
}

function setCancellationAmendmentSatellites(result, state, body, number, dimensions) {

    result['PAS_IMPL.AMENDMENT_SAT'] = getAmendmentSat({
        number,
        body,
        dimensions,
        state
    });

    result['PAS_IMPL.CNL_AMENDMENT_SAT'] = [
        {
            AMENDMENT_NUMBER: number,
            AMENDMENT_SUBTYPE: body.basicAmendmentConditions?.amendmentSubType,
            SHOULD_USE_NETTING: body.paymentAmendmentConditions?.shouldUseNetting ?? false,
            FIXED_EXCH_RATE: body.paymentAmendmentConditions?.fixedExchangeRate,
            USE_FIXED_EXCH_RATE: body.paymentAmendmentConditions?.useFixedExchangeRate ?? false
        }
    ];

    result['PAS_IMPL.AMENDMENT_LINES_SAT'] = getAmendmentLinesSat({
        number,
        body
    });

    result['PAS_IMPL.CNL_APPLICANT_SAT'] = [
        {
            $deleted: true,
            AMENDMENT_NUMBER: number
        }
    ];

    const applicant = getValue(body, 'basicAmendmentConditions.applicant');

    if (applicant) {

        result['PAS_IMPL.CNL_APPLICANT_LINK'] = [
            {
                AMENDMENT_NUMBER: number,
                PARTY_CODE: applicant.partyCode
            }
        ];

        result['PAS_IMPL.CNL_APPLICANT_SAT'].push(
            {
                AMENDMENT_NUMBER: number,
                PARTY_CODE: applicant.partyCode,
                RECEIVE_METHOD: getValue(body, 'basicAmendmentConditions.receiveMethod'),
                RECEIVE_DATE: getValue(body, 'basicAmendmentConditions.applicationReceiveDate'),
                SIGN_DATE: getValue(body, 'basicAmendmentConditions.applicationSignDate')
            }
        );
    }

    setCancellationRecipientData(body, number, result);
}

function setTechnicalAmendmentSatellites(result, body, number, originalDocumentNumber, dimensions, state) {

    result['PAS_IMPL.AMENDMENT_SAT'] = getAmendmentSat({
        number,
        body,
        dimensions,
        state
    });
}
