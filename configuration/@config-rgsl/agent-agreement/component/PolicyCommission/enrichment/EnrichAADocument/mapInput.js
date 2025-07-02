module.exports = function mapping(input) {

    const rootData = this.businessContext.rootData;
    const partnerCode = rootData.mainInsuranceConditions?.partner?.partnerCode;
    if (!partnerCode) { return null; }

    const agentAgreementId = rootData.commission?.agentAgreement?.id;
    if (agentAgreementId) { return null; }

    const productCode = rootData.mainInsuranceConditions?.insuranceProduct?.productCode;
    if (!productCode) { return null; }

    const output = {
        data: {
            criteria: {
                documentStates: ['Activated'],
            },
            sort: [
                {
                    fieldName: 'conclusionDate',
                    descending: false
                }
            ]
        }
    };

    const agentAgreementNumber = rootData.commission?.agentAgreement?.number;
    if (agentAgreementNumber) {
        output.data.criteria.documentCode = agentAgreementNumber;
    } else {
        output.data.criteria.agentServiceProviderCode = partnerCode;
        output.data.criteria.productCode = productCode;
    }

    return output;

};
