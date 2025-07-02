'use strict';

module.exports = function (input) {

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: [],
                filter: [],
                mustNot: []
            }
        },
        sort: []
    };

    const documentCode = input.data.criteria.documentCode;

    if (documentCode) {

        searchRequest.query.bool.must.push({

            match: {
                'number': documentCode
            }
        });
    }

    const contractNumber = input.data.criteria.contractNumber;

    if (contractNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.contractNumber': contractNumber
            }
        });
    }

    const riskCode = input.data.criteria.riskCode;

    if (riskCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.risk.riskCode': riskCode
            }
        });
    }

    const documentState = input.data.criteria.documentState;

    if (documentState) {

        searchRequest.query.bool.must.push({

            match: {
                'stateCode': documentState
            }
        });
    }

    const applicantCode = input.data.criteria.applicantCode;

    if (applicantCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.applicationInfo.applicantCode': applicantCode
            }
        });
    }

    const eventType = input.data.criteria.eventType;

    if (eventType) {

        searchRequest.query.bool.must.push({

            match: {
                'body.eventType.code': eventType
            }
        });
    }

    const eventReason = input.data.criteria.eventReason;

    if (eventReason) {

        searchRequest.query.bool.must.push({

            match: {
                'body.eventReason.code': eventReason
            }
        });
    }

    const eventDate = input.data.criteria.eventDate;

    if (eventDate) {

        searchRequest.query.bool.must.push({

            match: {
                'body.applicationInfo.eventDate': eventDate
            }
        });
    }

    const eventDateFrom = input.data.criteria.eventDateFrom;

    if (eventDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.eventDate': {
                    'gte': eventDateFrom
                }
            }
        });
    }

    const eventDateTo = input.data.criteria.eventDateTo;

    if (eventDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.eventDate': {
                    'lte': eventDateTo
                }
            }
        });
    }

    const statementReceivedDateFrom = input.data.criteria.statementReceivedDateFrom;

    if (statementReceivedDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.statementReceivedDate': {
                    'gte': statementReceivedDateFrom
                }
            }
        });
    }

    const statementReceivedDateTo = input.data.criteria.statementReceivedDateTo;

    if (statementReceivedDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.statementReceivedDate': {
                    'lte': statementReceivedDateTo
                }
            }
        });
    }

    const statementApplicationDateFrom = input.data.criteria.statementApplicationDateFrom;

    if (statementApplicationDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.statementApplicationDate': {
                    'gte': statementApplicationDateFrom
                }
            }
        });
    }

    const statementApplicationDateTo = input.data.criteria.statementApplicationDateTo;

    if (statementApplicationDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.applicationInfo.statementApplicationDate': {
                    'lte': statementApplicationDateTo
                }
            }
        });
    }

    const beneficiaryCode = input.data.criteria.beneficiaryCode;

    if (beneficiaryCode) {

        searchRequest.query.bool.filter.push({

            match: {
                'body.endowmentBeneficiaries.partyCode': beneficiaryCode
            }
        });
    }

    const onlyPaid = input.data.criteria.onlyPaid;

    if (onlyPaid) {

        searchRequest.query.bool.must.push({

            terms: {
                'stateCode': ['SentToPayment', 'PartiallyPaid', 'Paid']
            }
        });
    }

    const onlyNotPaid = input.data.criteria.onlyNotPaid;

    if (onlyNotPaid) {

        searchRequest.query.bool.mustNot.push({

            terms: {
                'stateCode': ['SentToPayment', 'PartiallyPaid', 'Paid']
            }
        });
    }

    const onlyNotCancelled = input.data.criteria.onlyNotCancelled;

    if (onlyNotCancelled) {

        searchRequest.query.bool.mustNot.push({

            terms: {
                'stateCode': ['Rejected', 'Cancelled']
            }
        });
    }

    return searchRequest;
};
