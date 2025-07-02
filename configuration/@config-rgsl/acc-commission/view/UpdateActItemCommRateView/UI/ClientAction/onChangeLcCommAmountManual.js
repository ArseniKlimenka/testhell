module.exports = async function onChangeLcCommAmountManual(input, ambientProperties) {

    const body = input.context.Body;
    if (body.lcCommAmountManual && body.lcBaseAmount) {
        body.commRateManual = body.lcCommAmountManual / body.lcBaseAmount;
    }
    else {
        body.commRateManual = undefined;
    }
};
