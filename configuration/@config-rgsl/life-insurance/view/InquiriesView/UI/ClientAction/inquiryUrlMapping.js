const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function inquiryUrlMapping(input) {

    const configurationCodeName = getValue(input, 'rootContext.ConfigurationCodeName', 'configurationCodeName');
    const isCollectivePolicy = configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    return `edit;entity=UniversalDocument;configurationCodeName=${isCollectivePolicy ? 'LifeInsurancePolicyInquiry' : 'LifeInsuranceInquiry'};version=1;documentNumber=${input.data.resultData.inquiryNumber}`;
};
