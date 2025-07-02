const { Exception } = require('handlebars');

module.exports = function DataSourceInputMapping(input) {

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

    const output = {
        query: {
            bool: {
                must: [],
                should: [],
                filter: [],
            }
        },
        sort: []
    };

    const criteria = input.data.criteria;

    if (criteria.rgslGuid) {
        output.query.bool.filter.push({
            match: {
                'rgslGuid': criteria.rgslGuid
            }
        });
    }

    if (criteria.debtorName) {
        output.query.bool.must.push({
            match: {
                'debtor.name': criteria.debtorName,
                operator: 'and',
            }
        });
    }

    if (criteria.debtorAccountNo) {
        output.query.bool.must.push({
            match: {
                'debtor.accountNo': criteria.debtorAccountNo,
                operator: 'and',
            }
        });
    }

    if (criteria.creditorName) {
        output.query.bool.must.push({
            match: {
                'creditor.name': criteria.creditorName,
                operator: 'and',
            }
        });
    }

    if (criteria.importDocumentId) {
        output.query.bool.filter.push({
            match: {
                'importDocumentId': criteria.importDocumentId
            }
        });
    }

    if (criteria.bankStatementItemId) {
        output.query.bool.filter.push({
            match: {
                'bankStatementItemId': criteria.bankStatementItemId
            }
        });
    }

    if (criteria.bankStatementItemNo) {
        output.query.bool.must.push({
            prefix: {
                'bankStatementItemNo': criteria.bankStatementItemNo,
            }
        });
    }

    if (criteria.description) {
        output.query.bool.must.push({
            prefix: {
                'description': criteria.description,
            }
        });
    }

    if (criteria.transactionDateFrom || criteria.transactionDateTo) {
        const limits = {};
        output.query.bool.filter.push({ range: { 'transactionDate': limits } });

        if (criteria.transactionDateFrom) {
            limits.gte = criteria.transactionDateFrom;
        }
        if (criteria.transactionDateTo) {
            limits.lte = criteria.transactionDateTo;
        }
    }

    if (criteria.paymentDateFrom || criteria.paymentDateTo) {
        const limits = {};
        output.query.bool.filter.push({ range: { 'paymentDate': limits } });

        if (criteria.paymentDateFrom) {
            limits.gte = criteria.paymentDateFrom;
        }
        if (criteria.paymentDateTo) {
            limits.lte = criteria.paymentDateTo;
        }
    }

    if (criteria.createDateFrom || criteria.createDateTo) {
        const limits = {};
        output.query.bool.filter.push({ range: { 'createDate': limits } });

        if (criteria.createDateFrom) {
            limits.gte = criteria.createDateFrom;
        }
        if (criteria.createDateTo) {
            limits.lte = criteria.createDateTo;
        }
    }

    if (criteria.amount) {
        output.query.bool.filter.push({
            match: {
                'amount': criteria.amount,
            }
        });
    }

    if (criteria.amountFrom || criteria.amountTo) {
        const limits = {};
        output.query.bool.filter.push({ range: { 'amount': limits } });

        if (criteria.amountFrom) {
            limits.gte = criteria.amountFrom;
        }
        if (criteria.amountTo) {
            limits.lte = criteria.amountTo;
        }
    }

    if (criteria.openAmountFrom || criteria.openAmountTo) {
        const limits = {};
        output.query.bool.filter.push({ range: { 'openAmount': limits } });

        if (criteria.openAmountFrom) {
            limits.gte = criteria.openAmountFrom;
        }
        if (criteria.openAmountTo) {
            limits.lte = criteria.openAmountTo;
        }
    }

    if (criteria.currencyCode) {
        output.query.bool.filter.push({
            match: {
                'currencyCode': criteria.currencyCode,
            }
        });
    }

    if (criteria.paymentStatusIds && criteria.paymentStatusIds.length > 0) {
        output.query.bool.filter.push({
            terms: {
                'paymentStatusId': criteria.paymentStatusIds,
            }
        });
    }

    if (criteria.isRegistry != undefined) {
        output.query.bool.filter.push({
            match: {
                'isRegistry': criteria.isRegistry,
            }
        });
    }

    if (criteria.referenceNo) {
        output.query.bool.must.push({
            match: {
                'referenceNumbers': criteria.referenceNo,
            }
        });
    }

    if (criteria.segment) {
        output.query.bool.filter.push({
            match: {
                'segment': criteria.segment,
            }
        });
    }

    if (criteria.registryFileFormat) {
        output.query.bool.filter.push({
            match: {
                'registryFileFormat': criteria.registryFileFormat,
            }
        });
    }

    if (criteria.direction) {
        output.query.bool.filter.push({
            match: {
                'direction': criteria.direction,
            }
        });
    }

    if (criteria.paymentSourceIds && criteria.paymentSourceIds.length > 0) {
        output.query.bool.filter.push({
            terms: {
                'paymentSourceId': criteria.paymentSourceIds,
            }
        });
    }

    if (criteria.incomeSourceId) {
        output.query.bool.filter.push({
            match: {
                'incomeSourceId': criteria.incomeSourceId,
            }
        });
    }

    if (criteria.hasRefunds) {
        output.query.bool.filter.push({
            match: {
                'hasRefunds': criteria.hasRefunds,
            }
        });
    }

    if (input.data.sort) {
        input.data.sort.forEach(field => {
            const sortInfo = {};
            let esProperty = '';
            switch (field.fieldName) {
                case 'status':
                    esProperty = 'paymentStatusId';
                    break;
                case 'source':
                    esProperty = 'paymentSourceId';
                    break;
                case 'currency':
                    esProperty = 'currencyCode';
                    break;
                case 'bankStatementItemNo':
                    esProperty = field.fieldName + '.keyword';
                    break;
                default:
                    esProperty = field.fieldName;
                    break;
            }
            if (esProperty.length > 0) {
                const direction = input.data.sort[0].descending ? 'desc' : 'asc';
                sortInfo[esProperty] = direction;
                output.sort.push(sortInfo);
            }
        });
    }

    return output;
};
