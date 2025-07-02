'use strict';
const { Exception } = require("handlebars");

module.exports = function (input) {

    const userRoles = this.applicationContext.user.applicationRoles;
    const isSMGO = userRoles.some(x => x == 'SMGO');
    const pageSize = input?.paging?.pageSize;
    if (!isSMGO) {
        if (!pageSize) {
            throw new Exception('Необходимо указать количество возвращаемых записей на странице!');
        }
        if (pageSize > 15) {
            throw new Exception('Превышено количество возвращаемых записей!');
        }
    }

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: [],
                filter: []
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

    const insuredPersonCode = input.data.criteria.insuredPersonCode;

    if (insuredPersonCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.insuredPersonInfo.insuredPersonCode': insuredPersonCode
            }
        });
    }

    const policyHolderCode = input.data.criteria.policyHolderCode;

    if (policyHolderCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.policyHolderInfo.policyHolderCode': policyHolderCode
            }
        });
    }

    const insuredEventDate = input.data.criteria.insuredEventDate;

    if (insuredEventDate) {

        searchRequest.query.bool.must.push({

            match: {
                'body.insuredEvent.insuredEventDate': insuredEventDate
            }
        });
    }

    const insuredEventDateFrom = input.data.criteria.insuredEventDateFrom;

    if (insuredEventDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.insuredEvent.insuredEventDate': {
                    'gte': insuredEventDateFrom
                }
            }
        });
    }

    const insuredEventDateTo = input.data.criteria.insuredEventDateTo;

    if (insuredEventDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.insuredEvent.insuredEventDate': {
                    'lte': insuredEventDateTo
                }
            }
        });
    }

    const statementReceivedDateFrom = input.data.criteria.statementReceivedDateFrom;

    if (statementReceivedDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.statementReceivedDate': {
                    'gte': statementReceivedDateFrom
                }
            }
        });
    }

    const statementReceivedDateTo = input.data.criteria.statementReceivedDateTo;

    if (statementReceivedDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.statementReceivedDate': {
                    'lte': statementReceivedDateTo
                }
            }
        });
    }

    const statementApplicationDateFrom = input.data.criteria.statementApplicationDateFrom;

    if (statementApplicationDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.statementApplicationDate': {
                    'gte': statementApplicationDateFrom
                }
            }
        });
    }

    const statementApplicationDateTo = input.data.criteria.statementApplicationDateTo;

    if (statementApplicationDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.statementApplicationDate': {
                    'lte': statementApplicationDateTo
                }
            }
        });
    }

    const beneficiaryCode = input.data.criteria.beneficiaryCode;

    if (beneficiaryCode) {

        searchRequest.query.bool.filter.push({

            match: {
                'body.claimBeneficiaries.partyCode': beneficiaryCode
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

    const insuredEventNumber = input.data.criteria.insuredEventNumber;

    if (insuredEventNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.insuredEvent.insuredEventNumber': insuredEventNumber
            }
        });
    }

    return searchRequest;
};
