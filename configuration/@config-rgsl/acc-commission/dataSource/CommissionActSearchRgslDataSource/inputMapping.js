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
                case 'actId':
                    sortedFieldName = 'ACT_ID';
                    break;
                case 'actNo':
                    sortedFieldName = 'ACT_NO';
                    break;
                case 'actIssueDate':
                    sortedFieldName = 'ISSUE_DATE';
                    break;
                case 'aaNumber':
                    sortedFieldName = 'AGENT_AGREEMENT_NUMBER';
                    break;
                case 'premiumAmount':
                    sortedFieldName = 'PREMIUM_AMOUNT_LC';
                    break;
                case 'commissionAmount':
                    sortedFieldName = 'COMM_AMOUNT_LC';
                    break;
                case 'aaServiceProviderName':
                    sortedFieldName = 'AGENT_FULL_NAME';
                    break;
                case 'actStateCode':
                    sortedFieldName = 'STATE_CODE';
                    break;
                case 'reportingPeriodFrom':
                    sortedFieldName = 'REPORTING_PERIOD_FROM';
                    break;
                case 'reportingPeriodTo':
                    sortedFieldName = 'REPORTING_PERIOD_TO';
                    break;
                case 'actPayDate':
                    sortedFieldName = 'PAY_DATE';
                    break;
                case 'aaExternalNumber':
                    sortedFieldName = 'AA_EXTERNAL_NUMBER';
                    break;
                case 'aaCbAgentType':
                    sortedFieldName = 'AA_AT_DESCRIPTION';
                    break;
                case 'attrMVZ':
                    sortedFieldName = 'ATTR_MVZ';
                    break;
                case 'originalReceiptDate':
                    sortedFieldName = 'ORIGINAL_RECEIPT_DATE';
                    break;
                case 'username':
                    sortedFieldName = 'USERNAME';
                    break;
                case 'createdDate':
                    sortedFieldName = 'CREATE_DATE';
                    break;
                case 'lastUpdated':
                    sortedFieldName = 'LAST_UPDATED';
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
            ACT_ID: 'asc'
        };
    }

    return output;
};
