'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const products = [
    "IBI3BFKO", "IBI5BFKO", "IBI3", "IBI5", "IBI10", "IBIP3", "IBIP5", "IBIP10", "IBI3AKCEPT",
    "IBI5AKCEPT", "IBI2ZENIT", "IBI3ZENIT", "IBI5ZENIT", "IBI3OAS", "IBI5OAS", "I652BFKO", "I652OAS",
    "I652ZENIT", "I648BFKO", "I648ZENIT", "I648OAS", "I649BFKO", "I649Zenit", "I649OAS", "I650Zenit",
    "I650BFKO", "I650OAS", "I651BFKO", "I651OAS", "I653BFKO", "I653Zenit", "I653OAS", "I668BFKOP",
    "I670BFKOP", "I672BFKOP", "I673BFKOP", "I678Zenit", "I679Zenit", "I684BFKO", "I684OAS", "I685BFKO",
    "I685OAS", "I686BFKOP", "I688BFKOP", "I690BFKOP", "I696Zenit", "I648SAS", "I652SAS", "I728Zenit",
    "I648DRGSL", "I652DRGSL", "IBI3BFKO17", "IBI5BFKO17", "IBI3ZENIT17", "IBI5ZENIT17"
];

module.exports = function mapping(input, sinkExchange) {

    const contractEntity = "Contract";
    const quote = sinkExchange.quote;

    const body = sinkExchange.contractEntityData?.body ?? {};
    body.policyIssueDate = input.issueDate;
    body.lastUpdateDate = DateTimeUtils.dateTimeNow();
    body.policy = {
        entity: contractEntity,
        number: input.contractNumber,
        originalConfigurationCodeName: input.originalConfigurationCodeName,
        originalConfigurationVersion: input.originalConfigurationVersion
    };
    body.quote = {
        entity: contractEntity,
        number: quote?.number,
        originalConfigurationCodeName: quote?.originalConfigurationCodeName,
        originalConfigurationVersion: quote?.originalConfigurationVersion
    };
    if (products.includes(input.productCode) && input.issueDate >= '2023-02-28') {
        body.receivedDocuments = {
            hasAmendment: true
        };
    }

    const code = sinkExchange.contractEntityData?.universalMasterEntityCode;

    return {
        code: code,
        body: body
    };
};
