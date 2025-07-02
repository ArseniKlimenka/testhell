const { sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapInput(input) {

    const body = input.context?.Body || this.businessContext?.rootData;
    const currentContractNumber = this.businessContext.documentNumber;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const insuredPersonPartyCode = body?.insuredPerson?.partyData?.partyCode;
    const startDate = body?.policyTerms?.startDate;
    const endDate = body?.policyTerms?.endDate;

    if (!sportProducts.includes(productCode)) {
        return;
    }

    if (!insuredPersonPartyCode || !productCode || !startDate || !endDate) {
        return;
    }

    const dataSourceInput = {
        data: {
            criteria: {
                state: 'Activated',
                partyCode: insuredPersonPartyCode,
                productCode: productCode,
                startDate: startDate,
                endDate: endDate,
                currentContractNumber: currentContractNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

    return dataSourceInput;
};
