'use strict';

const { bankStatementItemSourceId } = require("@config-rgsl/acc-base/lib/bankStatementEnums");

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: input.contractNumber,
                    bankStatementItemSourceIds: [bankStatementItemSourceId.RSD],
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
