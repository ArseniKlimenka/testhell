module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const criteria = input.data.criteria;
    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.payOffType = null;
    output.parameters.isins = null;

    if (criteria.productCode) {
        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.payOffType) {
        output.parameters.payOffType = criteria.payOffType;
    }

    if (criteria.isins) {
        output.parameters.isins = criteria.isins;
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'strategyCode':
                    sortedFieldName = 'strategy_code';
                    break;
                case 'strategyName':
                    sortedFieldName = 'strategy_name';
                    break;
                default:
                    sortedFieldName = 'strategy_name';
            }
            if (sortedFieldName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort = output.sort || {};
                output.sort[sortedFieldName] = direction;
            }
        });
    }

    if (!output.sort) {
        output.sort = {
            strategy_name: 'asc'
        };
    }

    return output;
};
