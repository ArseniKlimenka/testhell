module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
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
                case 'agentName':
                    sortedFieldName = 'AGENT_SHORT_NAME, AGENT_FULL_NAME';
                    break;
                case 'aaExternalNumber':
                    sortedFieldName = 'AA_EXTERNAL_NUMBER';
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
            AGENT_SHORT_NAME: 'desc',
            AGENT_FULL_NAME: 'desc',
        };
    }

    return output;
};
