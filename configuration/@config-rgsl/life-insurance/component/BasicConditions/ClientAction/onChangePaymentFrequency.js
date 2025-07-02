const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { processProductSelection } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangePaymentFrequency(input, ambientProperties) {

    const body = input.context.Body;
    const clientViewModel = input.context.ClientViewModel;
    const fixedPremiumsArray = input.componentContext.fixedPremiums;
    const fixedInsuredSumsArray = input.componentContext.fixedInsuredSums;
    const paymentFrequencyCode = getValue(input, 'data.paymentFrequency.paymentFrequencyCode', '1');
    const paymentCount = getPaymentCount(paymentFrequencyCode);

    if (fixedPremiumsArray && fixedPremiumsArray.length > 0) {
        input.componentContext.riskPremium = undefined;
    }

    if (fixedInsuredSumsArray && fixedInsuredSumsArray.length > 0) {
        input.componentContext.riskInsuredSum = undefined;
    }

    body.risks.forEach(x => {
        x.underwriterPremiumPaymentFrequency = getValue(x, 'underwriterPremium', 0) / 1000 / paymentCount;
    });

    const isOnChangeInsuranceProduct = false;
    const isOnChangeIssueDate = false;
    const isOnChangePaymentFrequency = true;
    const checkResults = await processProductSelection(body, this, ambientProperties, isOnChangeInsuranceProduct, isOnChangeIssueDate, isOnChangePaymentFrequency);

    if (checkResults && checkResults.length > 0) {
        clientViewModel.checkResults = checkResults;
        const notificationMessage = "При изменении продукта значение некоторых полей было скорректировано: "
            + checkResults.map(item => item.messageText).join('; ');
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
    }

    this.rebindComponent();

};

function getPaymentCount(paymentFrequencyCode) {

    let paymentCount = 1;
    switch (paymentFrequencyCode) {
        case '5':
            paymentCount = 12;
            break;
        case '3':
            paymentCount = 2;
            break;
        case '4':
            paymentCount = 4;
            break;
        default:
            paymentCount = 1;
    }

    return paymentCount;
}
