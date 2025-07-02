const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function onChangeCorrectionWithoutCalc(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const manualCorrection = input.data.manualCorrection;
    const isECOF = [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(input.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode);

    if (manualCorrection && isECOF) {

        await ambientProperties.services.confirmationDialog.showError('Использовать ручную корректировку с другими вариантами корректировки запрещено!', 'OK', 'Cancel', ONLY_OK_BUTTON);

        input.data.correctionWithoutCalc = false;
    }
};
