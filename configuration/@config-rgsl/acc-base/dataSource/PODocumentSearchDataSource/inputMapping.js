'use strict';

module.exports = function (input) {

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: []
            }
        },
        sort: []
    };

    const paymentOrderNumber = input.data.criteria.paymentOrderNumber;

    if (paymentOrderNumber) {

        searchRequest.query.bool.must.push({

            prefix: {
                'number': paymentOrderNumber
            }
        });
    }

    const recipientPartyCode = input.data.criteria.recipientPartyCode;

    if (recipientPartyCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.recipient.code': recipientPartyCode
            }
        });
    }

    const stateCode = input.data.criteria.stateCode;

    if (stateCode) {

        searchRequest.query.bool.must.push({

            match: {
                'stateCode': stateCode
            }
        });
    }

    const paymentOrderDateFrom = input.data.criteria.paymentOrderDateFrom;

    if (paymentOrderDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.paymentOrderDate': {
                    'gte': input.data.criteria.paymentOrderDateFrom
                }
            }
        });
    }

    const paymentOrderDateTo = input.data.criteria.paymentOrderDateTo;

    if (paymentOrderDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.paymentOrderDate': {
                    'lte': input.data.criteria.paymentOrderDateTo
                }
            }
        });
    }

    const referenceNumber = input.data.criteria.referenceNumber;

    if (referenceNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.referenceNumber': referenceNumber
            }
        });
    }

    const referenceNumbers = input.data.criteria.referenceNumbers;

    if (referenceNumbers) {

        searchRequest.query.bool.must.push({

            terms: {
                'body.referenceNumber': referenceNumbers
            }
        });
    }

    const contractNumber = input.data.criteria.contractNumber;

    if (contractNumber) {

        searchRequest.query.bool.must.push({

            prefix: {
                'body.contractNumber': contractNumber
            }
        });
    }

    let contractNumbers = input.data.criteria.contractNumbers;

    if (input.data.criteria.contractNumbersStr) {
        const parsed = input.data.criteria.contractNumbersStr.split(/(?:\r\n|\r|\n)/g);
        if (parsed.length === 0) {
            throw 'No documents was parsed: "' + input.data.criteria.contractNumbersStr + '"';
        }
        if (!contractNumbers) {
            contractNumbers = [];
        }
        contractNumbers.push(...parsed);
    }

    if (contractNumbers) {

        searchRequest.query.bool.must.push({

            terms: {
                'body.contractNumber': contractNumbers
            }
        });
    }

    const paymentOrderType = input.data.criteria.paymentOrderType;

    if (paymentOrderType) {

        searchRequest.query.bool.must.push({

            match: {
                'body.paymentOrderType': paymentOrderType
            }
        });
    }

    const paymentOrderSubType = input.data.criteria.paymentOrderSubType;

    if (paymentOrderSubType) {

        searchRequest.query.bool.must.push({

            match: {
                'body.paymentOrderSubType': paymentOrderSubType
            }
        });
    }

    const paymentOrderCurrencyCode = input.data.criteria.paymentOrderCurrencyCode;

    if (paymentOrderCurrencyCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.paymentOrderAmounts.paymentOrderCurrencyCode': paymentOrderCurrencyCode
            }
        });
    }

    const totalPaymentAmountFrom = input.data.criteria.totalPaymentAmountFrom;

    if (totalPaymentAmountFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.paymentOrderAmounts.totalPaymentAmount': {
                    'gte': input.data.criteria.totalPaymentAmountFrom
                }
            }
        });
    }

    const totalPaymentAmountTo = input.data.criteria.totalPaymentAmountTo;

    if (totalPaymentAmountTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.paymentOrderAmounts.totalPaymentAmount': {
                    'lte': input.data.criteria.totalPaymentAmountTo
                }
            }
        });
    }

    const isCoolOffPeriod = input.data.criteria.isCoolOffPeriod;

    if (isCoolOffPeriod) {

        searchRequest.query.bool.must.push({

            match: {
                'body.isCoolOffPeriod': isCoolOffPeriod
            }
        });
    }

    const isManual = input.data.criteria.isManual;

    if (isManual !== undefined) {

        if (isManual) {

            searchRequest.query.bool.must.push({

                match: {
                    'body.isManual': isManual
                }
            });
        }
        else {

            searchRequest.query.bool.must.push({

                bool: {
                    should: [{
                        match: {
                            'body.isManual': isManual
                        }
                    },
                    {
                        bool: {
                            mustNot: [{
                                exists: {
                                    field: 'body.isManual'
                                }
                            }]
                        }
                    }
                    ]
                }
            });
        }

        searchRequest.query.bool.must.push({

            match: {
                'body.isManual': isManual
            }
        });
    }

    const onlyPaid = input.data.criteria.onlyPaid;

    if (onlyPaid) {

        searchRequest.query.bool.must.push({

            terms: {
                'stateCode': ['Paid', 'PaidCancelledNetting']
            }
        });
    }

    const parentPaymentOrderNumber = input.data.criteria.parentPaymentOrderNumber;

    if (parentPaymentOrderNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.parentPaymentOrderNumber': parentPaymentOrderNumber
            }
        });
    }

    const isCreatedFromNetting = input.data.criteria.isCreatedFromNetting;

    if (isCreatedFromNetting !== undefined) {

        if (isCreatedFromNetting) {

            searchRequest.query.bool.must.push({

                match: {
                    'body.isCreatedFromNetting': isCreatedFromNetting
                }
            });
        }
        else {

            searchRequest.query.bool.must.push({

                bool: {
                    should: [{
                        match: {
                            'body.isCreatedFromNetting': isCreatedFromNetting
                        }
                    },
                    {
                        bool: {
                            mustNot: [{
                                exists: {
                                    field: 'body.isCreatedFromNetting'
                                }
                            }]
                        }
                    }
                    ]
                }
            });
        }
    }

    if (input.data.sort) {

        input.data.sort.forEach(element => {

            const sortInfo = {};
            let elasticName = '';

            switch (element.fieldName) {

                case 'paymentOrderDate':
                    elasticName = 'body.paymentOrderDate';
                    break;
            }

            if (elasticName.length > 0) {

                const direction = input.data.sort[0].descending ? 'desc' : 'asc';
                sortInfo[elasticName] = direction;
                searchRequest.sort.push(sortInfo);
            }
        });
    }

    return searchRequest;
};
