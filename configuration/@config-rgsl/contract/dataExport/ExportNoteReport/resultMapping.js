const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            contractNumber: item.resultData.contractNumber,
            state: getStateName(item.resultData.state),
            futureContractNumber: item.resultData.futureContractNumber || '',
            issueDate: item.resultData.issueDate || '',
            strategyDescription: item.resultData.strategyDescription || '',
            purchaseDate: item.resultData.purchaseDate || '',
            isReinvest: getBooleanValue(item.resultData.isReinvest),
            premium: item.resultData.premium || '0',
            paidPremium: item.resultData.paidPremium || '0',
            isPaid: item.resultData.isPaid,
            comment: item.resultData.comment || ''
        };
    });

    return result;
};

function getStateName(state) {

    return translationUtils.getTranslation('document/InvestmentLifeInsuranceQuote/1', 'states', null, state);
}

function getBooleanValue(input) {

    return input ? 'Да' : 'Нет';
}
