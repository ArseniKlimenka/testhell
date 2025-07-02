module.exports = function onChangeManualCorrection(input, ambientProperties) {

    delete input.componentContext.paymentPeriodLastDate;

    this.rebindComponent();
};
