module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Invalid input parameters!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'resultData':
                case 'periodId':
                    sortedFieldName = 'PERIOD_ID';
                    break;
                case 'periodStatusId':
                    sortedFieldName = 'PERIOD_STATUS_ID';
                    break;
                case 'startDate':
                    sortedFieldName = 'START_DATE';
                    break;
                case 'endDate':
                    sortedFieldName = 'END_DATE';
                    break;
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
            PERIOD_ID: 'asc'
        };
    }

    return output;
};
